export type Mask = string

export type Value = string

export enum PredictMode {
  Fast,
  Lazy,
}

export interface CheckFn {
  (options: CheckFnOptions): boolean;
}

export interface CheckFnOptions {
  mask: Mask;
  value: Value;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
}

export interface TransformFn {
  (options: TransformFnOptions): Value | false;
}

export interface TransformFnOptions {
  mask: Mask;
  value: Value;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
}

export interface PredictFn {
  (options: PredictFnOptions): Value | false;
}

export interface PredictFnOptions {
  mask: Mask;
  value: Value;

  // optional
  digitSymbols?: string[];
  charSymbols?: string[];
  specialSymbols?: string[];
  mode?: PredictMode;
}
