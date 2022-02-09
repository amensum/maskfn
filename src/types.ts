export type MaskfxMask = string

export type MaskfxValue = string

export enum MaskfxPredictMode {
  Fast,
  Lazy,
}

export interface MaskfxCheck {
  (options: MaskfxCheckOptions): boolean;
}

export interface MaskfxCheckOptions {
  mask: MaskfxMask;
  value: MaskfxValue;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
}

export interface MaskfxPredict {
  (options: MaskfxPredictOptions): MaskfxValue | false;
}

export interface MaskfxPredictOptions {
  mask: MaskfxMask;
  value: MaskfxValue;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
  mode?: MaskfxPredictMode;
}

export interface MaskfxUnmask {
  (options: MaskfxUnmaskOptions): MaskfxValue | false;
}

export interface MaskfxUnmaskOptions {
  mask: MaskfxMask;
  value: MaskfxValue;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
}
