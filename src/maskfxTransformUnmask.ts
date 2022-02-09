import { MaskfxTransform, Value } from "./types";
import checkMasked from "./maskfxCheckMasked";
import checkUnmasked from "./maskfxCheckUnmasked";

const maskfxTransformUnmask: MaskfxTransform = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
}) => {
  const checkOptions = { mask, digitSymbols, charSymbols, specialSymbols };

  if (!checkMasked({ ...checkOptions, value: value })) {
    return false;
  }

  let unmaskedVal: Value = "";

  for (let i = 0; i < value.length; i++) {
    if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
      unmaskedVal += value[i];
    }
  }

  if (!checkUnmasked({ ...checkOptions, value: unmaskedVal })) {
    return false;
  }

  return unmaskedVal;
};

export default maskfxTransformUnmask;
