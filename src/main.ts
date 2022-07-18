import { AseTapManager } from './AseUI/tap';
import { AseWindow } from './AseUI/window';

declare global {
  namespace ColorMode {
    export const RGB: number;
    export const GRAY: number;
    export const INDEXED: number;
  }
  // ImageSpec
  interface ImageSpecification {
    width: number;
    height: number;
    colorMode: number;
    transparentColor: number;
  }
  class ImageSpec implements ImageSpecification {
    constructor(from?: ImageSpecification);
    width: number;
    height: number;
    colorMode: number;
    transparentColor: number;
  }

  type filename = string;

  interface SpriteFile {
    fromFile: filename;
    oneFrame: Frame;
  }

  interface Frame {
    sprite: Sprite;
    frameNumber: number;
    duration: number;
    previous: Frame | null;
    next: Frame | null;
  }

  class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    isEmpty: boolean;
    constructor(x: number, y: number, width: number, height: number);
    contains(otherRectangle: Rectangle): boolean;
    intersects(otherRectangle: Rectangle): boolean;
    union(otherRectangle: Rectangle): Rectangle;
    intersect(otherRectangle: Rectangle): Rectangle;
  }

  interface ISize {
    width: number;
    height: number;
  }

  class Size implements ISize {
    width: number;
    height: number;
    constructor(width: number | ISize | [number, number], height: number);
  }

  interface IPoint {
    x: number;
    y: number;
  }

  class Point implements IPoint {
    x: number;
    y: number;
    constructor(x: number | IPoint | [number, number], y: number);
  }

  class Selection {
    constructor(rectangle: Rectangle);
    rectangle: Rectangle;
    bounds: Rectangle;
    origin: Point;
    isEmpty: boolean;
    deselect(): void;
    select(rectangle: Rectangle): void;
    selectAll(): void;
    add(rectangle: Rectangle | Selection): void;
    subtract(rectangle: Rectangle | Selection): void;
    contains(x: number | Point, y: number): boolean;
  }

  /** @noSelf **/
  class PixelColor {
    rgba(red: number, green: number, blue: number, alpha?: number): number;
    rgbaR(rgbaPixelValue: number): number;
    rgbaG(rgbaPixelValue: number): number;
    rgbaB(rgbaPixelValue: number): number;
    rgbaA(rgbaPixelValue: number): number;
    graya(gray: number, alpha?: number): number;
    grayaV(grayPixelValue: number): number;
    grayaA(grayPixelValue: number): number;
  }

  type ColorConfig =
    | { r: number; g: number; b: number; a: number }
    | { h: number; s: number; v: number; a: number }
    | { red: number; green: number; blue: number; alpha: number }
    | { hue: number; saturation: number; value: number; alpha: number }
    | { hue: number; saturation: number; lightness: number; alpha: number }
    | { index: number }
    | number;

  class Color {
    constructor(colorConfig: ColorConfig);
    alpha: number;
    red: number;
    green: number;
    blue: number;
    hsvHue: number;
    hsvSaturation: number;
    hsvValue: number;
    hslHue: number;
    hslSaturation: number;
    hslLightness: number;
    hue: number;
    saturation: number;
    value: number;
    lightness: number;
    index: number;
    gray: number;
    rgbaPixel: PixelColor;
    grayPixel: PixelColor;
  }

  class Palette {
    constructor(numberOfColors: number);
    frame: Frame;
    resize(ncolors: number): void;
    getColor(index: number): Color;
    setColor(index: number, color: number): Color;
    saveAs(filename: filename): void;
  }

  interface Tool {
    id: string;
  }

  class Sprite {
    width: number;
    height: number;
    bounds: Rectangle;
    gridBounds: Rectangle;
    pixelRatio: Size;
    selection: Selection;
    filename: filename;
    colorMode: number;
    spec: ImageSpec;
    frames: Frame[];
    palettes: Palette[];
    layers: Layer[];
    cels: Cel[];
    tags: Tag[];
    slices: Slice[];
    events: Event[];
    backgroundLayer: BackgroundLayer | Layer;
    transparentColor: number;
    constructor(width: number | ImageSpec | Sprite | SpriteFile, height?: number, colorMode?: number);
    resize(width: number | Size, height: number): void;
    crop(x: number | Size, y?: number, width?: number, height?: number): void;
    saveAs(filename: filename): void;
    saveCopyAs(filename: filename): void;
    close(): void;
    loadPalette(filename: filename): void;
    setPalette(palette: Palette): void;
    assingColorSpace(colorSpace: ColorSpace): void;
    newLayer(): Layer;
    newGroup(): LayerGroup;
    newFrame(frame: Frame | number): Frame;
    newEmptyFrame(): Frame;
    deleteFrame(frame: Frame | number): void;
    newCel(layer: Layer, frame: Frame, image?: Image, position: Position): Cel;
    deleteCel(cel: Cel | Layer, frame?: Frame): void;
    newTag(fromFrameNumber: number, toFrameNumber: number): Tag;
    deleteTag(tag: Tag): void;
    newSlice(rectangle?: Rectangle): Slice;
    deleteSlice(slice: Slice | string): void;
    flatten(): void;
  }

  /** @noSelf **/
  namespace app {
    export const rage: Range;

    export const activeCel: Cel;

    export const activeFrame: Frame;

    export const activeImage: Image;

    export const activeSprite: Sprite;

    export const activeTag: Tag;

    export const activeTool: Tool;

    export const activeBrush: Brush;

    export const pixelColor: PixelColor;

    export const version: string;

    export const apiVersion: number;

    export const fgColor: Color;

    export const bgColor: Color;

    export const isUIAvailable: boolean;

    export const sprites: Sprite[];

    export const params: Object;

    export const alert: (message: string | { title: string; text: string | string[]; buttons: string | string[] }) => void;

    export const open: (filename: filename) => Sprite | null;


    export const exit: () => void;
    export const transaction: (callback: () => void) => void;
    export const command: CommandName;
    export namespace preferences {
      export const section : Object;
      export const option: Object;
      export const tool: () => Tool;
      export const document: () => Sprite;
    }
    export namespace fs{
    }
    export const refresh: () => void;
    export const undo: () => void;
    export const redo: () => void;
    export const useTool: ({
      tool:string,
      color: Color,
      bgColor: Color,
      brush:Brush,
      points: Point[],
      cel:Cel,
      layer:Layer,
      frame:Frame,
      ink:Ink,
      button:MouseButton.LEFT | MouseButton.RIGHT,
      opacity:integer,
      contiguous:false | true,
      tolerance:integer,
      freehandAlgorithm:0 | 1,
      selection:SelectionMode.REPLACE | SelectionMode.ADD | SelectionMode.SUBTRACT | SelectionMode.INTERSECT
     }) => void;

    /** @noSelf **/
    export namespace site {
      export const sprite: Sprite;
    }
  }
}

Object.keys(app.params);
for (const element in app.params) {
  console.log(app.params, element);
}

const taps = new AseTapManager();
const window = new AseWindow(taps);
window.onMinimize();
console.log('hello world');
