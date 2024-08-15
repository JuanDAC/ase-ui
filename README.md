
# 🎨 ase_ui - UI Library for Aseprite Plugins 🌟

Welcome to `ase_ui`, a comprehensive UI library designed specifically for creating beautiful and functional interfaces for Aseprite scripts. This library leverages the power of TypeScript and Lua, enabling developers to create interfaces with ease, much like using Flutter!

## 📦 Installation

To install the `ase_ui` library, use the following command with `asepm`:

```bash
asepm install dependency juandac/ase-ui
```

## 🚀 Features

- **Easy to use**: Create complex UIs with minimal code.
- **TypeScript support**: Write your Aseprite plugins in TypeScript and convert them to Lua.
- **Component-based architecture**: Modular and reusable components.
- **Built-in state management**: Handle UI state efficiently.

## 🧩 Components Provided

The `ase_ui` library comes with a variety of pre-built components to make your UI development faster and more efficient. Here's a list of components you can use:

- **App**: The main wrapper for your UI application.
- **Button**: A customizable button component.
- **Check**: A checkbox for selecting options.
- **Combobox**: A dropdown list for selecting one option from a list.
- **Entry**: A text input field for user input.
- **Label**: A simple text label.
- **Newrow**: A component to start a new row in your layout.
- **Number**: A number input field.
- **Radio**: A radio button for selecting one option from multiple choices.
- **Separator**: A horizontal line to separate different sections.
- **Slider**: A slider for selecting a value within a range.
- **Color**: A color picker for selecting colors.
- **Shades**: A component to display shades of a selected color.

## 🛠️ Usage Examples

### 1️⃣ Tap Managers

```typescript
import { App, Button, Combobox, Separator } from './AseUI/components';
import { AseComponent } from './AseUI/window/aseComponent';

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
      onclose: () => {},
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
            // Handle language change
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

new Main();
```

### 2️⃣ Task Manager

```typescript
import { App, Button, Check, Entry, Newrow, Separator } from './AseUI/components';
import { ComponentFormart, OnEvent } from './AseUI/components/interface';
import { AseComponent } from './AseUI/window/aseComponent';

class TasksMetadata {
  done: boolean;
  index: number;
  static count = 0;

  constructor({ done = false } = {}) {
    this.done = done;
    this.index = ++TasksMetadata.count;
  }

  toggle() {
    this.done = !this.done;
    return this;
  }
}

type Tasks = { [key: string]: TasksMetadata };

type ValuesLocalState = Tasks;

class Main extends AseComponent {
  localstate!: Map<string, ValuesLocalState>;

  constructor() {
    super();
  }

  initialState() {
    this.localstate = new Map();
    this.localstate.set('tasks', {});
  }

  run() {
    this.window.template = App({
      title: 'TASK MANAGER',
      onclose: () => true,
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
        ...this.tasks,
      ],
    });
  }

  get tasks() {
    return Object.entries((this.localstate.get('tasks') ?? {}) as Tasks)
      .sort(([_, a], [__, b]) => a.index - b.index)
      .map(this.createTask())
      .flat();
  }

  addTask(): OnEvent {
    return () => {
      const name: string = this.window.state.task ?? '';
      const previouTasks: object = this.localstate.get('tasks') ?? {};
      if (Object.keys(previouTasks).includes(name) || name.replaceAll(' ', '').length === 0) return;
      this.localstate.set('tasks', { ...(this.localstate.get('tasks') || {}), [name]: new TasksMetadata({ done: false }) });
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

  createTask(): (this: any, value: [string, TasksMetadata], index: number, array: [string, TasksMetadata][]) => ComponentFormart[] {
    return ([name, taskConfig]: [string, TasksMetadata], index: number) => [
      Check({
        id: `task-${name}-${index}`,
        text: `${index}: ${name}`,
        selected: taskConfig.done,
        onclick: () => {
          taskConfig.toggle();
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
        text: taskConfig.done ? 'TODO' : 'DONE',
        onclick: () => {
          taskConfig.toggle();
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
```

## 🗂️ Project Structure

Here's the project structure for `ase_ui`:

```bash
.:
LICENSE  README.md  asepm-package.json  components  index.ts  luaPlugins  modules.ts  package-lock.json  package.json  src  state  tap  tsconfig.json  tsdoc.json  window

./components:
index.ts

./luaPlugins:
serverAseprite

./luaPlugins/serverAseprite:
index.ts

./src:
AseUI  debug.ts  main.ts

./src/AseUI:
components  interface  state  tap  window

./src/AseUI/components:
app.ts  button.ts  check.ts  color.ts  combobox.ts  component.ts  entry.ts  file.ts  interface.ts  label.ts  newrow.ts  number.ts  radio.ts  separator.ts  shades.ts  slider.ts

./src/AseUI/interface:
index.ts

./src/AseUI/state:
components.ts  state.ts

./src/AseUI/tap:
aseTap.ts  aseTapManager.ts  interface.ts

./src/AseUI/window:
aseComponent.ts  aseView.ts  aseWindow.ts  interface.ts

./state:
index.ts

./tap:
index.ts

./window:
index.ts
```

## 🎯 Getting Started

1. **Clone the repository**: 
   ```bash
   git clone https://github.com/juandac/ase-ui.git
   ```
   
2. **Install dependencies**:
   ```bash
   npm install
   ```
   
3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Start developing**: Explore the `examples` directory for more use cases.

## 📄 License

`ase_ui` is licensed under the MIT License. Feel free to use, modify, and distribute the library as per the terms.
