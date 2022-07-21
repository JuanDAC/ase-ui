import { App, Button, Combobox, Separator } from './AseUI/components';
import { AseComponent } from './AseUI/window/aseComponent';
import { JSON } from './services/share/JSON';

class Main extends AseComponent {
  constructor() {
    super();
  }

  initialState() {
    this.state.initial('ASEUI_languages', 'visible', false);
  }

  run() {
    this.window.template = App({
      title: 'ASEUI',
      onclose: () => {
        return;
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
            this.window.onMinimize();
            this.window.hide();
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
  }
}
const program = new Main();
