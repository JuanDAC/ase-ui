import { App, Main, Window } from '../src/AseUI/components/app';
import { Button } from '../src/AseUI/components/button';
import { Check, Checkbox } from '../src/AseUI/components/check';
import { Combobox, Select } from '../src/AseUI/components/combobox';
import { Separator } from '../src/AseUI/components/separator';
import { Color } from '../src/AseUI/components/color';
import { Entry, Input } from '../src/AseUI/components/entry';
import { File } from '../src/AseUI/components/file';
import { Label } from '../src/AseUI/components/label';
import { Newrow } from '../src/AseUI/components/newrow';
import { Number } from '../src/AseUI/components/number';
import { Radio } from '../src/AseUI/components/radio';
import { Shades } from '../src/AseUI/components/shades';
import { Slider } from '../src/AseUI/components/slider';
import { Component, Div, Column, Row } from '../src/AseUI/components/component';
import type { ComponentFormart } from '../src/AseUI/components/interface';
import type { State } from '../state';
import type { AseWindow } from '../window';

export type FC<T extends { id: string }> = (_: T & { state?: State; window?: AseWindow }) => ComponentFormart[];

export {
  Button,
  Separator,
  App,
  Combobox,
  Select,
  Check,
  Color,
  Entry,
  File,
  Label,
  Newrow,
  Number,
  Radio,
  Shades,
  Slider,
  Component,
  Main,
  Window,
  Checkbox,
  Input,
  Div,
  Column,
  Row,
};
