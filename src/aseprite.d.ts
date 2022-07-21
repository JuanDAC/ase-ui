/* eslint-disable tsdoc/syntax */

/* eslint-disable @typescript-eslint/ban-types */
declare global {
  enum AniDir {
    FORWARD = 0,
    REVERSE,
    PING_PONG,
  }

  enum BlendMode {
    NORMAL = 0,
    MULTIPLY,
    SCREEN,
    OVERLAY,
    DARKEN,
    LIGHTEN,
    COLOR_DODGE,
    COLOR_BURN,
    HARD_LIGHT,
    SOFT_LIGHT,
    DIFFERENCE,
    EXCLUSION,
    HSL_HUE,
    HSL_SATURATION,
    HSL_COLOR,
    HSL_LUMINOSITY,
    ADDITION,
    SUBTRACT,
    DIVIDE,
  }

  enum BrushPattern {
    NONE = 0,
    ORIGIN,
    TARGET,
  }

  enum BrushType {
    CIRCLE = 0,
    SQUARE,
    LINE,
    IMAGE,
  }

  enum ColorMode {
    RGB = 0,
    GRAY,
    INDEXED,
  }

  enum FilterChannels {
    RED = 1,
    GREEN = 2,
    BLUE = 4,
    ALPHA = 8,
    GRAY = 16,
    INDEX = 32,
    RGB = FilterChannels.RED | FilterChannels.GREEN | FilterChannels.BLUE,
    RGBA = FilterChannels.RGB | FilterChannels.ALPHA,
    GRAYA = FilterChannels.GRAY | FilterChannels.ALPHA,
  }

  enum Ink {
    SIMPLE = 0,
    ALPHA_COMPOSITING,
    COPY_COLOR,
    LOCK_ALPHA,
    SHADING,
  }

  enum MouseButton {
    NONE = 0,
    LEFT = 1,
    RIGHT = 2,
    MIDDLE = 3,
    X1,
    X2,
  }

  enum RangeType {
    EMPTY = 0,
    LAYERS,
    FRAMES,
    CELS,
  }

  enum SpriteSheetDataFormat {
    JSON_HASH = 0,
    JSON_ARRAY,
  }

  enum SpriteSheetType {
    HORIZONTAL = 0,
    VERTICAL,
    ROWS,
    COLUMNS,
    PACKED,
  }

  enum SelectionMode {
    REPLACE = 0,
    ADD,
    SUBTRACT,
    INTERSECT,
  }

  enum WebSocketMessageType {
    TEXT = 0,
    BINARY,
    OPEN,
    CLOSE,
    PING,
    PONG,
    FRAGMENT,
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
  type Position = number | [number, number] | { x: number; y: number };

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

  interface DialogOptions {
    title?: string;
    onclose?: (this: any) => void;
    position?: Position;
  }

  interface ComponentOptions {
    id?: string;
    visible?: boolean;
    enabled?: boolean;
    label?: string;
    text?: string;
    color?: Color;
    option?: string;
    options?: string[];
    selected?: boolean;
    focus?: boolean;
    onclick?: Function;
    min?: number;
    max?: number;
    value?: number;
    onchange?: Function;
    onrelease?: Function;
    open?: boolean;
    save?: boolean;
    filename?: string | string[];
    filetypes?: string[];
    wait?: boolean;
    bounds?: Rectangle;
  }

  /** @customConstructor ComponentProperties */
  class ComponentProperties implements ComponentOptions {
    constructor(componentProperties: ComponentOptions);
  }

  /** @customConstructor Dialog */
  class Dialog {
    data: { [id: string]: any; ok: boolean };
    constructor(titleOrOptions?: string | DialogOptions);
    button(componentOptions: ComponentOptions): Dialog;
    check(componentOptions: ComponentOptions): Dialog;
    color(componentOptions: ComponentOptions): Dialog;
    combobox(componentOptions: ComponentOptions): Dialog;
    entry(componentOptions: ComponentOptions): Dialog;
    label(componentOptions: ComponentOptions): Dialog;
    modify(componentOptions: ComponentOptions): Dialog;
    newrow(componentOptions: ComponentOptions): Dialog;
    number(componentOptions: ComponentOptions): Dialog;
    radio(componentOptions: ComponentOptions): Dialog;
    separator(componentOptions: ComponentOptions): Dialog;
    shades(componentOptions: ComponentOptions): Dialog;
    show(componentOptions: ComponentOptions): Dialog;
    close(): Dialog;
    slider(componentOptions: ComponentOptions): Dialog;
    file(componentOptions: ComponentOptions): Dialog;
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

  class Image {
    constructor(specOrWidth: ImageSpec | Sprite | Image, height?: number, colorMode?: number);
    clone(): Image;
    width: number;
    height: number;
    colorMode: number;
    spec: ImageSpec;
    cel: Cel;
    bytes: unknown;
    rowStride: number;
    clear(color?: Color): void;
    darwPixel(x: number, y: number, color: Color): void;
    getPixel(x: number, y: number): PixelColor;
    drawImage(image: Image, position?: Position): void;
    drawSprite(sourceSprite: Sprite | number, frameNumber: number, position?: Position): void;
    isEqualTo(otherImage: Image): boolean;
    isEmpty(): boolean;
    isPlain(): boolean;
    pixels(): PixelColor[];
    putPixel(): void;
    putImage(): void;
    saveAs(filename: filename): void;
    resize(
      width: number | { width: number; height: number; size: Size; method: 'bilinear' | 'rotsprite'; pivot: Point },
      height: number
    ): void;
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

  class Cel {
    sprite: Sprite;
    layer: Layer;
    frame: Frame;
    frameNumber: number;
    image: Image;
    bounds: Rectangle;
    position: Position;
    opacity: number;
    color: Color;
    data: string;
  }

  class Layer {
    sprite: Sprite;
    name: string;
    opacity: number;
    blandMode: BlendMode;
    layers: Layer[];
    parent: Layer | Sprite;
    stackIndex: number;
    isImage: boolean;
    isGroup: boolean;
    isTransparent: boolean;
    isBackground: boolean;
    isEditable: boolean;
    isVisible: boolean;
    isContinuous: boolean;
    isCollapsed: boolean;
    isExpanded: boolean;
    isReference: boolean;
    cels: Cel[];
    color: Color;
    data: string;
    cel(frameNumber: Frame | number): Cel | null;
  }

  class Tag {
    sprite: Sprite;
    fromFrame: Frame;
    toFrame: Frame;
    frames: Frame[];
    name: string;
    aniDir: AniDir;
    color: Color;
  }

  class Slice {
    bounds: Rectangle;
    center: Rectangle;
    color: Color;
    data: string;
    name: string;
    pivot: Point;
    sprite: Sprite;
  }

  class Events {
    on(eventName: string, callback: Function): void;
    off(eventName: string, callback: Function): void;
  }

  class ColorSpace {
    constructor(config?: { sRGB?: boolean; fromFile?: string });
    name: string;
  }

  class Range {
    type: RangeType;
    isEmpty: boolean;
    sprite: Sprite;
    layers: Layer[];
    frames: Frame[];
    cels: Cel[];
    images: Image[];
    editableImages: Image[];
    colors: Color[];
    contains(layer: Layer | Frame | Cel): boolean;
    cotainsColor(colorIndex: number): boolean;
    claer(): void;
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
    events: Events;
    backgroundLayer: Layer;
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
    newGroup(): Layer[];
    newFrame(frame: Frame | number): Frame;
    newEmptyFrame(): Frame;
    deleteFrame(frame: Frame | number): void;
    newCel(layer: Layer, frame: Frame, image?: Image, position?: Position): Cel;
    deleteCel(cel: Cel | Layer, frame?: Frame): void;
    newTag(fromFrameNumber: number, toFrameNumber: number): Tag;
    deleteTag(tag: Tag): void;
    newSlice(rectangle?: Rectangle): Slice;
    deleteSlice(slice: Slice | string): void;
    flatten(): void;
  }

  class CommandName {}

  class Brush {
    constructor(
      config?:
        | Size
        | Image
        | {
            type: BrushType;
            size: number;
            angle: number;
            center: Point;
            image: Image;
            pattern: BrushPattern;
            patternOrigin: Point;
          }
    );
    size: Size;
    angle: number;
    image: Image;
    type: BrushType;
    center: Point;
    pattern: BrushPattern;
    patternOrigin: Point;
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
      export const section: Object;
      export const option: Object;
      export const tool: () => Tool;
      export const document: () => Sprite;
    }
    export namespace fs {}
    export const refresh: () => void;
    export const undo: () => void;
    export const redo: () => void;
    type ToolConfig = {
      tool: string;
      color: Color;
      bgColor: Color;
      brush: Brush;
      points: Point[];
      cel: Cel;
      layer: Layer;
      frame: Frame;
      ink: Ink;
      button: MouseButton | 1 | 2; // 1 = left, 2 = right
      opacity: number;
      contiguous: false | true;
      tolerance: number;
      freehandAlgorithm: 0 | 1;
      selection: SelectionMode; // SelectionMode.REPLACE | SelectionMode.ADD | SelectionMode.SUBTRACT | SelectionMode.INTERSECT
    };
    export const useTool: (toolConfig: ToolConfig) => void;

    /** @noSelf **/
    export namespace site {
      export const sprite: Sprite;
    }
  }
}

export default global;
