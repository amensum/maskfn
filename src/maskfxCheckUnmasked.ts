import { MaskfxCheckUnmasked, Mask } from "./types";
import checkMasked from "./maskfxCheckMasked";

const maskfxCheckUnmasked: MaskfxCheckUnmasked = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
}) => {
  let maskAlt: Mask = "";

  for (let i = 0; i < mask.length; i++) {
    if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
      maskAlt += mask[i];
    }
  }

  return checkMasked({ mask: maskAlt, value, digitSymbols, charSymbols });
};

export default maskfxCheckUnmasked;
