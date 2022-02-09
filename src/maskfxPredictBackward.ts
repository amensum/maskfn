import { MaskfxPredict, PredictMode, Value } from "./types";
import check from "./maskfxCheck";

const maskfxPredictBackward: MaskfxPredict = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
  mode = PredictMode.Fast,
}) => {
  let backwardVal: Value = value;

  switch (mode) {
    case PredictMode.Fast:
      for (let i = mask.length; i > 0; i--) {
        if (i === backwardVal.length) {
          if (digitSymbols.includes(mask[i - 1]) || charSymbols.includes(mask[i - 1])) {
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
