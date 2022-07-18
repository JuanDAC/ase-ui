import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';
import { resolve } from 'node:path';

class Plugin implements tstl.Plugin {
  private prevProcess?: ChildProcessWithoutNullStreams;
  public beforeTransform(program: ts.Program, options: tstl.CompilerOptions, emitHost: tstl.EmitHost) {
    setTimeout(() => {
      const { luaBundle } = options;
      const processName = 'aseprite';
      const mainScript = resolve(__dirname, '../../', luaBundle ?? 'main.lua');
      if (this.prevProcess) this.prevProcess.kill();
      const aseprite = spawn(processName, ['--shell', '--verbose', '--debug', '--script-param', 'env=development', '--script', mainScript]);
      this.prevProcess = aseprite;

      console.log('-'.repeat(80));
      console.log(processName.toUpperCase(), ' with procees ID: ', aseprite.pid);
      console.log('-'.repeat(80));

      aseprite.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      aseprite.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      aseprite.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
      });
    }, 3000);
  }
}

const plugin = new Plugin();
export default plugin;
