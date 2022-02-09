import { MaskfxPredict, MaskfxPredictMode, MaskfxValue } from "./types";
import check from "./maskfxCheck";

const maskfxPredictBackward: MaskfxPredict = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
  mode = MaskfxPredictMode.Fast,
}) => {
  let backwardVal: MaskfxValue = value;

  switch (mode) {
    case MaskfxPredictMode.Fast:
      for (let i = mask.length; i > 0; i--) {
        if (i === backwardVal.length) {
          if (digitSymbols.includes(mask[i - 1])) {
            continue;
          }

          if (charSymbols.includes(mask[i - 1])) {
            continue;
          }

          backwardVal = backwardVal.slice(0, i - 1);
        }
      }
      break;
    case MaskfxPredictMode.Lazy:
      for (let i = mask.length; i > 0; i--) {
        if (i === backwardVal.length) {
          if (digitSymbols.includes(mask[i])) {
            continue;
          }

          if (charSymbols.includes(mask[i])) {
            continue;
          }

          backwardVal = backwardVal.slice(0, i - 1);
        }
      }
      break;
  }

  const checkResult = check({
    mask,
    value: backwardVal,
    digitSymbols,
    charSymbols,
    specialSymbols,
  });

  return checkResult ? backwardVal : false;
};

export default maskfxPredictBackward;
