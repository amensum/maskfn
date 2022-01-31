import { Maskfx, MaskfxMode } from "./maskfx.types";

const maskfx: Maskfx = ({
  mask,
  value,
  changedValue,
  addMode = MaskfxMode.Lazy,
  delMode = MaskfxMode.Fast,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
}) => {
  const specialRule = specialSymbols
    .map(s => `[${s}]`)
    .join("|");
  const digitRule = digitSymbols
    .map(s => `[${s}]`)
    .join("|");
  const charRule = charSymbols
    .map(s => `[${s}]`)
    .join("|");

  const specialRegular = new RegExp(specialRule, "g");
  const digitRegular = new RegExp(digitRule, "g");
  const charRegular = new RegExp(charRule, "g");

  const valTemplate = mask
    .replace(digitRegular, "7")
    .replace(charRegular, "A");
  const valRule = mask
    .replace(specialRegular, "\\$&")
    .replace(digitRegular, "[0-9]")
    .replace(charRegular, "[a-zA-Z]");
  const valRegular = new RegExp(`^${valRule}$`);

  // Add symbols
  if (changedValue.length > value.length) {
    switch (addMode) {
      case MaskfxMode.Fast:
        for (let i = 0; i < mask.length; i++) {
          if (i === changedValue.length) {
            if (digitSymbols.includes(mask[i])) {
              continue;
            }

            if (charSymbols.includes(mask[i])) {
              continue;
            }

            changedValue += mask[i];
          }
        }
        break;
      case MaskfxMode.Lazy:
        for (let i = 0; i < mask.length; i++) {
          if (i === changedValue.length - 1) {
            if (digitSymbols.includes(mask[i])) {
              continue;
            }

            if (charSymbols.includes(mask[i])) {
              continue;
            }

            changedValue = changedValue.slice(0, i) + mask[i] + changedValue[i];
          }
        }
        break;
    }
  }

  // Del symbols
  if (changedValue.length < value.length) {
    switch (delMode) {
      case MaskfxMode.Fast:
        for (let i = mask.length; i > 0; i--) {
          if (i === changedValue.length) {
            if (digitSymbols.includes(mask[i - 1])) {
              continue;
            }

            if (charSymbols.includes(mask[i - 1])) {
              continue;
            }

            changedValue = changedValue.slice(0, i - 1);
          }
        }
        break;
      case MaskfxMode.Lazy:
        for (let i = mask.length; i > 0; i--) {
          if (i === changedValue.length) {
            if (digitSymbols.includes(mask[i])) {
              continue;
            }

            if (charSymbols.includes(mask[i])) {
              continue;
            }

            changedValue = changedValue.slice(0, i - 1);
          }
        }
        break;
    }
  }

  const templated = changedValue + valTemplate.slice(changedValue.length);

  if (valRegular.test(templated)) {
    return changedValue;
  }

  return false;
};

export default maskfx;
