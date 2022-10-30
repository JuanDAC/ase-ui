import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';
import { resolve } from 'node:path';
import 'dotenv/config';

const NOGUI = JSON.parse(process?.env?.NOGUI ?? 'false') as boolean;
class Plugin implements tstl.Plugin {
  private prevProcess?: ChildProcessWithoutNullStreams;
  public beforeTransform(program: ts.Program, options: tstl.CompilerOptions /*, emitHost: tstl.EmitHost */) {
    setTimeout(() => {
      const { luaBundle } = options;
      const processName = 'aseprite';
      const mainScript = resolve(__dirname, '../../', luaBundle ?? 'main.lua');
      if (this.prevProcess) this.prevProcess.kill();
      const args = ['--debug', '--script-param', 'env=development', '--script', mainScript];
      NOGUI && args.push('--shell');
      const aseprite = spawn(processName, args);
      this.prevProcess = aseprite;

      print('-'.repeat(80));
      const title = ` ${processName.toUpperCase()} with procees ID: ${aseprite.pid}`;
      print('|', title, ' '.repeat(75 - title.length), '|');
      print('-'.repeat(80));

      aseprite.stdout.on('data', (data) => {
        print(data.toString());
      });

      aseprite.stderr.on('data', (data) => {
        print(data.toString());
      });

      aseprite.on('exit', (code) => {
        print(`Child exited with code ${code}`);
      });
    }, 3000);
  }
}

const plugin = new Plugin();
export default plugin;
