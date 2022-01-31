export enum MaskfxMode {
  None,
  Fast,
  Lazy,
}

export interface Maskfx {
  (options: MaskfxOptions): string | false;
}

export interface MaskfxOptions {
  mask: string;
  value: string;
  changedValue: string;

  // optional
  addMode?: MaskfxMode;
  delMode?: MaskfxMode;
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
}
