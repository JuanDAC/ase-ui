import { App, Button, Combobox, Separator } from './AseUI/components';
import { State } from './AseUI/state';
import { AseTapManager } from './AseUI/tap';
import { AseWindow } from './AseUI/window';
import { development } from './debug';
import { JSON } from './services/share/JSON';

class Main {
  private window: AseWindow;
  private tapManager: AseTapManager;
  private state: State;

  constructor() {
    this.tapManager = new AseTapManager('ASEUI_tap_manager');
    this.window = new AseWindow(this.tapManager);
    this.state = new State(this.window);
    this.run();
  }

  public run() {
    this.state.initial('ASEUI_languages', 'visible', true);
    this.window.template = App({
      title: 'ASEUI',
      onclose: () => {
        console.log('close');
      },
      children: [
        Separator({
          id: 'ASEUI_separator_setting',
          text: 'settings',
        }),
        Combobox({
          id: 'ASEUI_languages',
          focus: true,
          visible: this.state.obtain('ASEUI_languages', 'visible'),
          option: 'es-ES',
          options: ['es-ES', 'en-US'],
          onchange: () => {
            console.log('change', JSON.stringify(this.window.state));
          },
        }),
        Button({
          id: 'ASEUI_languages_changes',
          text: 'language',
          selected: false,
          onclick: () => {
            this.state.update('ASEUI_languages', 'visible', (visible) => !visible);
          },
        }),
        Button({
          id: 'ASEUI_minimize',
          text: 'minimize',
          selected: false,
          visible: true,
          onclick: () => {
            console.log('Apply ');
          },
        }),
        Button({
          id: 'ASEUI_close',
          text: 'close',
          selected: false,
          visible: true,
          onclick: () => this.window.hide(),
        }),
      ],
    });
    this.window.render();
  }
}
const program = new Main();
