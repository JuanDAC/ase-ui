/* import * as path from 'node:path';
import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

const reportDiagnostic = tstl.createDiagnosticReporter(true);
const configFileName = path.resolve(__dirname, 'tsconfig.json');
const parsedCommandLine = tstl.parseConfigFileWithSystem(configFileName);
if (parsedCommandLine.errors.length > 0) {
  parsedCommandLine.errors.forEach(reportDiagnostic);
}

const program = ts.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options);
const emitResult = tstl.transpileFiles(parsedCommandLine.fileNames, parsedCommandLine.options);

/* emitResult.diagnostics.forEach(({ messageText }) => {
  if (typeof messageText === 'string' && messageText.includes('file') && messageText.includes('@modules')) {
    const index = messageText.indexOf('in file');
    const relativePath = messageText.substring(index + 8);
    const pathFileName = path.resolve(__dirname, relativePath);
    console.log(pathFileName);
    console.log(messageText);
    console.log(messageText);
    console.log(messageText);
    console.log(messageText);
    console.log(messageText);
    console.log(messageText);
  }
}); 

const diagnostics = ts.sortAndDeduplicateDiagnostics([...ts.getPreEmitDiagnostics(program)]);
diagnostics.forEach(reportDiagnostic);
 */
