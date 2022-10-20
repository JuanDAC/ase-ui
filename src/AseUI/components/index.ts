import { App } from './app';
import { Button } from './button';
import { Check } from './check';
import { Combobox } from './combobox';
import { Separator } from './separator';
import { Color } from './color';
import { Entry } from './entry';
import { File } from './file';
import { Label } from './label';
import { Newrow } from './newrow';
import { Number } from './number';
import { Radio } from './radio';
import { Shades } from './shades';
import { Slider } from './slider';
import { Component } from './component';
import type { ComponentFormart } from './interface';
import type { State } from '../state';
import type { AseWindow } from '../window';

export type FC<T extends { id: string }> = (_: T & { state?: State; window?: AseWindow }) => ComponentFormart[];

export { Button, Separator, App, Combobox, Check, Color, Entry, File, Label, Newrow, Number, Radio, Shades, Slider, Component };
