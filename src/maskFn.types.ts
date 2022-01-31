export enum MaskFnMode {
  None,
  Fast,
  Lazy,
}

export interface MaskFn {
  (options: MaskFnOptions): string | false;
}

export interface MaskFnOptions {
  mask: string;
  value: string;
  changedValue: string;

  // optional
  addMode?: MaskFnMode;
  delMode?: MaskFnMode;
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
}
