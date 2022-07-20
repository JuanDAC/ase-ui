import { App, Button, Combobox, Separator } from './AseUI/components';
import { AseTapManager } from './AseUI/tap';
import { AseWindow } from './AseUI/window';
import { development } from './debug';
import { JSON } from './services/share/JSON';

class Main {
  private window: AseWindow;
  private tapManager: AseTapManager;

  constructor() {
    this.tapManager = new AseTapManager('ASEUI_tap_manager');
    this.window = new AseWindow(this.tapManager);
    this.run();
  }

  public run() {
    this.window.template = App({
      title: 'ASEUI',
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
        Button({
          id: 'apply_changes',
          text: 'Apply',
          selected: false,
          visible: true,
          onclick: (self) => () => {
            console.log('Apply ', self.ui);
          },
        }),
      ],
    });
    this.window.createUI();
    this.window.mountComponents();
    this.window.show();
  }
}
const program = new Main();
