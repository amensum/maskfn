import { MaskfxMask, Value } from "./types";
import check from "./maskfxCheck";

const maskfxMask: MaskfxMask = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
}) => {
  let maskedVal: Value = "";

  for (let i = 0, j = 0; i < mask.length && j < value.length; i++) {
    if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
      maskedVal += value[j++];
    } else {
      maskedVal += mask[i];
    }
  }

  const checkResult = check({
    mask,
    value: maskedVal,
    digitSymbols,
    charSymbols,
    specialSymbols,
  });

  return checkResult ? maskedVal : false;
};

export default maskfxMask;
