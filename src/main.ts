import { App, Button, Check, Combobox, Entry, Label, Newrow, Separator } from './AseUI/components';
import { ComponentFormart, OnEvent } from './AseUI/components/interface';
import { AseComponent } from './AseUI/window/aseComponent';
import { JSON } from './services/share/JSON';

/* class Main extends AseComponent {
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
} */

class Main extends AseComponent {
  localstate!: Map<string, any>;
  constructor() {
    super();
  }

  initialState() {
    this.localstate = new Map();
    this.localstate.set('tasks', []);
  }

  run() {
    this.window.template = App({
      title: 'TASK MANAGER',
      onclose: () => {
        return;
      },
      children: [
        Separator({
          id: 'actions',
          text: 'Add task',
        }),
        Entry({
          id: 'task',
          text: '',
        }),
        Button({
          id: 'create-task',
          text: 'Add',
          selected: false,
          onclick: this.addTask(),
        }),
        Separator({
          id: 'task-list',
          text: 'Tasks:',
        }),
        ...(Object.entries(this.localstate.get('tasks') ?? {}) as any[]).map(this.createTask()).flat(),
      ],
    });
  }

  addTask(): OnEvent {
    return () => {
      const name: string = this.window.state.task ?? '';
      const previouTasks: object = this.localstate.get('tasks') ?? {};
      if (Object.keys(previouTasks).includes(name) || name.replaceAll(' ', '').length === 0) return;
      this.localstate.set('tasks', { ...(this.localstate.get('tasks') || {}), [name]: false });
      this.update();
    };
  }
  removeTask(name: string): OnEvent {
    return () => {
      const previouTasks: object = this.localstate.get('tasks') ?? {};
      delete previouTasks[name as keyof typeof previouTasks];
      this.localstate.set('tasks', { ...previouTasks });
      this.update();
    };
  }
  createTask(): (this: any, value: any, index: number, array: any[]) => ComponentFormart[] {
    return ([name, done]: [string, boolean], index: number) => [
      Check({
        id: `task-${name}-${index}`,
        text: `${index}: ${name}`,
        selected: done,
        onclick: () => {
          this.localstate.set('tasks', { ...(this.localstate.get('tasks') || {}), [name]: !done });
          this.update();
        },
      }),
      Button({
        id: `remove-task-${name}-${index}`,
        text: 'Remove',
        onclick: this.removeTask(name),
      }),
      Button({
        id: `remove-task-${name}-${index}`,
        text: done ? 'TODO' : 'DONE',
        onclick: () => {
          this.localstate.set('tasks', { ...(this.localstate.get('tasks') || {}), [name]: !done });
          this.update();
        },
      }),
      Newrow(),
      Separator({
        id: 'actions',
      }),
    ];
  }
}

new Main();
