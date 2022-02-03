export enum MaskfxMode {
  None,
  Fast,
  Lazy,
}

export interface Maskfx {
  (options: MaskfxOptions): MaskfxResult;
}

export interface MaskfxOptions {
  mask: string;
  value: string;

  // optional
  addMode?: MaskfxMode;
  delMode?: MaskfxMode;
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
}

export interface MaskfxResult {
  forward: string | false;
  backward: string | false;
}
