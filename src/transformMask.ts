import { TransformFn, Value } from "./types";
import checkUnmasked from "./checkUnmasked";

const transformMask: TransformFn = ({
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

  return maskedVal;
};

export default transformMask;
