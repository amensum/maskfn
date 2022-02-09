import { MaskfxTransform, Value } from "./types";
import checkMasked from "./maskfxCheckMasked";
import checkUnmasked from "./maskfxCheckUnmasked";

const maskfxTransformMask: MaskfxTransform = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
}) => {
  const checkOptions = { mask, digitSymbols, charSymbols, specialSymbols };

  if (!checkUnmasked({ ...checkOptions, value: value })) {
    return false;
  }

  let maskedVal: Value = "";

  for (let i = 0, j = 0; i < mask.length && j < value.length; i++) {
    if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
      maskedVal += value[j++];
    } else {
      maskedVal += mask[i];
    }
  }

  if (!checkMasked({ ...checkOptions, value: maskedVal })) {
    return false;
  }

  return maskedVal;
};

export default maskfxTransformMask;
