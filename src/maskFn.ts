import { MaskFn, MaskFnMode } from "./maskFn.types";

const maskFn: MaskFn = ({
  mask,
  value,
  changedValue,
  addMode = MaskFnMode.Lazy,
  delMode = MaskFnMode.Fast,
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
      case MaskFnMode.Fast:
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
      case MaskFnMode.Lazy:
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
      case MaskFnMode.Fast:
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
      case MaskFnMode.Lazy:
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

export default maskFn;
