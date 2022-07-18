import { AseTapManager } from './AseUI/tap';
import { AseWindow } from './AseUI/window';

Object.keys(app.params);
for (const element in app.params) {
  console.log(app.params, element);
}

const taps = new AseTapManager();
const window = new AseWindow(taps);
window.onMinimize();
console.log('hello world');
