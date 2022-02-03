import { Maskfx, MaskfxMode, MaskfxResult } from "./maskfx.types";

const maskfx: Maskfx = ({
  mask,
  value,
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

  let forward = value;
  switch (addMode) {
    case MaskfxMode.Fast:
      for (let i = 0; i < mask.length; i++) {
        if (i === forward.length) {
          if (digitSymbols.includes(mask[i])) {
            continue;
          }

          if (charSymbols.includes(mask[i])) {
            continue;
          }

          forward += mask[i];
        }
      }
      break;
    case MaskfxMode.Lazy:
      for (let i = 0; i < mask.length; i++) {
        if (i === forward.length - 1) {
          if (digitSymbols.includes(mask[i])) {
            continue;
          }

          if (charSymbols.includes(mask[i])) {
            continue;
          }

          forward = forward.slice(0, i) + mask[i] + forward[i];
        }
      }
      break;
  }

  let backward = value;
  switch (delMode) {
    case MaskfxMode.Fast:
      for (let i = mask.length; i > 0; i--) {
        if (i === backward.length) {
          if (digitSymbols.includes(mask[i - 1])) {
            continue;
          }

          if (charSymbols.includes(mask[i - 1])) {
            continue;
          }

          backward = backward.slice(0, i - 1);
        }
      }
      break;
    case MaskfxMode.Lazy:
      for (let i = mask.length; i > 0; i--) {
        if (i === backward.length) {
          if (digitSymbols.includes(mask[i])) {
            continue;
          }

          if (charSymbols.includes(mask[i])) {
            continue;
          }

          backward = backward.slice(0, i - 1);
        }
      }
      break;
  }

  const result: MaskfxResult = {
    forward: false,
    backward: false,
  };

  const forwardTemplated = forward + valTemplate.slice(forward.length);
  if (valRegular.test(forwardTemplated)) {
    result.forward = forward;
  }

  const backwardTemplated = backward + valTemplate.slice(backward.length);
  if (valRegular.test(backwardTemplated)) {
    result.backward = backward;
  }

  return result;
};

export default maskfx;
