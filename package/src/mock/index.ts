/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Skia as SkiaApi, SkRect } from "../skia/types";
import type * as SkiaExports from "../skia";
import type * as ExternalExports from "../external";
import type * as ValueExports from "../values";
import * as AnimationExports from "../animation";
import * as Values from "../values/web";
import * as ValuesHooks from "../values/hooks";
import * as BaseSkia from "../skia/types";

const MockJSIInstance: any = {};
const Noop = () => MockJSIInstance;

// TODO: this could be replaced by a mock of CanvasKit:
// e.g. const Skia = new JsiSkia(CanvasKit);
export const Skia: SkiaApi = {
  Point: Noop,
  XYWHRect: Noop,
  RuntimeShaderBuilder: Noop,
  RRectXY: Noop,
  RSXform: Noop,
  Color: Noop,
  ContourMeasureIter: Noop,
  Paint: Noop,
  PictureRecorder: Noop,
  Picture: {
    MakePicture: Noop,
  },
  Path: {
    Make: Noop,
    MakeFromSVGString: Noop,
    MakeFromOp: Noop,
    MakeFromCmds: Noop,
    MakeFromText: Noop,
  },
  Matrix: Noop,
  ColorFilter: {
    MakeMatrix: Noop,
    MakeBlend: Noop,
    MakeCompose: Noop,
    MakeLerp: Noop,
    MakeLinearToSRGBGamma: Noop,
    MakeSRGBToLinearGamma: Noop,
    MakeLumaColorFilter: Noop,
  },
  Font: Noop,
  Typeface: {
    MakeFreeTypeFaceFromData: Noop,
  },
  MaskFilter: {
    MakeBlur: Noop,
  },
  RuntimeEffect: {
    Make: Noop,
  },
  ImageFilter: {
    MakeOffset: Noop,
    MakeDisplacementMap: Noop,
    MakeShader: Noop,
    MakeBlur: Noop,
    MakeColorFilter: Noop,
    MakeCompose: Noop,
    MakeDropShadow: Noop,
    MakeDropShadowOnly: Noop,
    MakeErode: Noop,
    MakeDilate: Noop,
    MakeBlend: Noop,
    MakeRuntimeShader: Noop,
  },
  Shader: {
    MakeLinearGradient: Noop,
    MakeRadialGradient: Noop,
    MakeTwoPointConicalGradient: Noop,
    MakeSweepGradient: Noop,
    MakeTurbulence: Noop,
    MakeFractalNoise: Noop,
    MakeBlend: Noop,
    MakeColor: Noop,
  },
  PathEffect: {
    MakeCorner: Noop,
    MakeDash: Noop,
    MakeDiscrete: Noop,
    MakeCompose: Noop,
    MakeSum: Noop,
    MakeLine2D: Noop,
    MakePath1D: Noop,
    MakePath2D: Noop,
  },
  MakeVertices: Noop,
  Data: {
    fromURI: Noop,
    fromBytes: Noop,
    fromBase64: Noop,
  },
  Image: {
    MakeImageFromEncoded: Noop,
    MakeImage: Noop,
  },
  SVG: {
    MakeFromData: Noop,
    MakeFromString: Noop,
  },
  FontMgr: {
    RefDefault: Noop,
  },
  TextBlob: {
    MakeFromText: Noop,
    MakeFromGlyphs: Noop,
    MakeFromRSXform: Noop,
    MakeFromRSXformGlyphs: Noop,
  },
  Surface: {
    Make: Noop,
  },
};

export const vec = (x?: number, y?: number) => ({ x: x ?? 0, y: y ?? x ?? 0 });

export const rect = (x: number, y: number, width: number, height: number) => ({
  x,
  y,
  width,
  height,
});

export const rrect = (r: SkRect, rx: number, ry: number) => ({
  rect: r,
  rx,
  ry,
});

const Mock: typeof SkiaExports &
  typeof ExternalExports &
  typeof ValueExports &
  typeof AnimationExports = {
  // SkiaExports
  // 1. Skia API. BaseSkia contains the enums, and functions like isPaint etc
  Skia,
  ...BaseSkia,
  // 2. Hooks
  useDataCollection: Noop,
  useRawData: Noop,
  useData: Noop,
  useFont: Noop,
  useTypeface: Noop,
  useImage: Noop,
  usePath: Noop,
  useSVG: Noop,
  useTextPath: Noop,
  usePaint: Noop,
  usePicture: Noop,
  useSvgPath: Noop,
  // 3. Point/Rect/Transform utilities
  vec,
  rect,
  rrect,
  point: vec,
  add: Noop,
  sub: Noop,
  neg: Noop,
  dist: Noop,
  translate: Noop,
  bounds: Noop,
  topLeft: Noop,
  topRight: Noop,
  bottomLeft: Noop,
  bottomRight: Noop,
  center: Noop,
  processTransform2d: Noop,
  // ExternalExports
  useSharedValueEffect: Noop,
  // ValueExports
  ...Values,
  ...ValuesHooks,
  // Animations
  ...AnimationExports,
};

// eslint-disable-next-line import/no-default-export
export default Mock;
