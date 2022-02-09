import { MaskfxPredict, PredictMode, Value } from "./types";
import checkMasked from "./maskfxCheckMasked";

const maskfxPredictBackward: MaskfxPredict = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
  mode = PredictMode.Fast,
}) => {
  const checkOptions = { mask, digitSymbols, charSymbols, specialSymbols };

  // if (!checkMasked({ ...checkOptions, value: value })) {
  //   return false;
  // }

  let backwardVal: Value = value;

  switch (mode) {
    case PredictMode.Fast:
      for (let i = mask.length; i > 0; i--) {
        if (i === backwardVal.length) {
          if (digitSymbols.includes(mask[i - 1]) ||
            charSymbols.includes(mask[i - 1])) {
            continue;
          }

          backwardVal = backwardVal.slice(0, i - 1);
        }
      }
      break;
    case PredictMode.Lazy:
      for (let i = mask.length; i > 0; i--) {
        if (i === backwardVal.length) {
          if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
            continue;
          }

          backwardVal = backwardVal.slice(0, i - 1);
        }
      }
      break;
  }

  if (!checkMasked({ ...checkOptions, value: backwardVal })) {
    return false;
  }

  return backwardVal;
};

export default maskfxPredictBackward;
