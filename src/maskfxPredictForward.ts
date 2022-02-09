import { MaskfxPredict, MaskfxPredictMode, MaskfxValue } from "./types";
import check from "./maskfxCheck";

const maskfxPredictForward: MaskfxPredict = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
  mode = MaskfxPredictMode.Lazy,
}) => {
  let forwardVal: MaskfxValue = value;

  switch (mode) {
    case MaskfxPredictMode.Fast:
      for (let i = 0; i < mask.length; i++) {
        if (i === forwardVal.length) {
          if (digitSymbols.includes(mask[i])) {
            continue;
          }

          if (charSymbols.includes(mask[i])) {
            continue;
          }

          forwardVal += mask[i];
        }
      }
      break;
    case MaskfxPredictMode.Lazy:
      for (let i = 0; i < mask.length; i++) {
        if (i === forwardVal.length - 1) {
          if (digitSymbols.includes(mask[i])) {
            continue;
          }

          if (charSymbols.includes(mask[i])) {
            continue;
          }

          forwardVal = forwardVal.slice(0, i) + mask[i] + forwardVal[i];
        }
      }
      break;
  }

  const checkResult = check({
    mask,
    value: forwardVal,
    digitSymbols,
    charSymbols,
    specialSymbols,
  });

  return checkResult ? forwardVal : false;
};

export default maskfxPredictForward;
