import { AseTapManager } from './AseUI/tap';
import { AseWindow } from './AseUI/window';
import { development } from './debug';


class Main {
    private window: AseWindow;
    private tapManager: AseTapManager;

    constructor() {
        this.tapManager = new AseTapManager();
        this.window = new AseWindow(this.tapManager);
    }

    public run() {
        this.window.show();
    }
}
const program = new Main();
program.run()
