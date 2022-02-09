import { MaskfxCheck } from "./types";

const maskfxCheckMasked: MaskfxCheck = ({
  mask,
  value,
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

  const maskTemplate = mask
    .replace(digitRegular, "7")
    .replace(charRegular, "A");
  const maskRule = mask
    .replace(specialRegular, "\\$&")
    .replace(digitRegular, "[0-9]")
    .replace(charRegular, "[a-zA-Z]");
  const maskRegular = new RegExp(`^${maskRule}$`);

  return maskRegular.test(value + maskTemplate.slice(value.length));
};

export default maskfxCheckMasked;
