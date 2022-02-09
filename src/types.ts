export type Mask = string

export type Value = string

export enum PredictMode {
  Fast,
  Lazy,
}

export interface MaskfxCheckMasked {
  (options: MaskfxCheckMaskedOptions): boolean;
}

export interface MaskfxCheckMaskedOptions {
  mask: Mask;
  value: Value;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
}

export interface MaskfxCheckUnmasked {
  (options: MaskfxCheckUnmaskedOptions): boolean;
}

export interface MaskfxCheckUnmaskedOptions {
  mask: Mask;
  value: Value;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
}

export interface MaskfxTransform {
  (options: MaskfxTransformOptions): Value | false;
}

export interface MaskfxTransformOptions {
  mask: Mask;
  value: Value;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
}

export interface MaskfxPredict {
  (options: MaskfxPredictOptions): Value | false;
}

export interface MaskfxPredictOptions {
  mask: Mask;
  value: Value;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
  mode?: PredictMode;
}
