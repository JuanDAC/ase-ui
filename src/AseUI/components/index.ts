import { App, Main, Window } from './app';
import { Button } from './button';
import { Check, Checkbox } from './check';
import { Combobox, Select } from './combobox';
import { Separator } from './separator';
import { Color } from './color';
import { Entry, Input } from './entry';
import { File } from './file';
import { Label } from './label';
import { Newrow } from './newrow';
import { Number } from './number';
import { Radio } from './radio';
import { Shades } from './shades';
import { Slider } from './slider';
import { Component, Div, Column, Row } from './component';
import type { ComponentFormart } from './interface';
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
