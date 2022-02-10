import { MaskfxCheck, Mask } from "./types";
import checkMasked from "./checkMasked";

const checkUnmasked: MaskfxCheck = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
}) => {
  const checkOptions = { value, digitSymbols, charSymbols, specialSymbols };

  let maskAlt: Mask = "";

  for (let i = 0; i < mask.length; i++) {
    if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
      maskAlt += mask[i];
    }
  }

  return checkMasked({ ...checkOptions, mask: maskAlt });
};

export default checkUnmasked;
