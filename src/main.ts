import { App, Button, Combobox, Separator } from './AseUI/components';
import { AseTapManager } from './AseUI/tap';
import { AseWindow } from './AseUI/window';
import { development } from './debug';

class Main {
  private window: AseWindow;
  private tapManager: AseTapManager;

  constructor() {
    this.tapManager = new AseTapManager('ASEUI_tap_manager');
    this.window = new AseWindow(this.tapManager);
    program.run();
  }

  public run() {
    this.window.template(
      App({
        children: [
          Separator({
            text: 'Settings',
            id: 'ASEUI_separator_setting',
          }),
          Combobox({
            id: 'ASEUI_languages',
            focus: true,
            visible: true,
            option: 'es-ES',
            options: ['es-ES', 'en-US'],
          }),
          Button({
            id: 'languages_changes',
            text: 'Changes',
            selected: false,
          }),
        ],
      })
    );
    this.window.show();
  }
}
const program = new Main();
