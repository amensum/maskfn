import { MaskfxUnmask, MaskfxValue } from "./types";
import check from "./maskfxCheck";

const maskfxUnmask: MaskfxUnmask = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
}) => {
  const checkResult = check({
    mask,
    value,
    digitSymbols,
    charSymbols,
    specialSymbols,
  });

  if (checkResult) {
    let unmaskedVal: MaskfxValue = "";

    for (let i = 0; i < value.length; i++) {
      if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
        unmaskedVal += value[i];
      }
    }

    return unmaskedVal;
  }

  return false;
};

export default maskfxUnmask;
