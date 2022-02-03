# maskfx

[![version](https://img.shields.io/npm/v/maskfx.svg?style=flat-square&logo=npm)](https://npmjs.com/package/maskfx)
[![size](https://img.shields.io/bundlephobia/min/maskfx.svg?style=flat-square&logo=npm)](https://npmjs.com/package/maskfx)
[![license](https://img.shields.io/npm/l/maskfx.svg?style=flat-square&logo=npm)](https://npmjs.com/package/maskfx)
[![downloads](https://img.shields.io/npm/dm/maskfx.svg?style=flat-square&logo=npm)](https://npmjs.com/package/maskfx)

## Setup

Using npm:

```bash
$ npm install maskfx
```

Using yarn:

```bash
$ yarn add maskfx
```

## Usage

```typescript
import maskfx, { MaskfxMode } from "maskfx";

// ...

const [phone, setPhone] = useState("");

const onChangePhone = (value: string) => {
  const masked = maskfx({
    mask: "+7 (DDD) DDD-DD-DD",
    value: value,
    addMode: MaskfxMode.Lazy, // optional
    delMode: MaskfxMode.Fast, // optional
  });

  if (value.length > phone.length && masked.forward !== false) {
    setPhone(masked.forward);
  }

  if (value.length < phone.length && masked.backward !== false) {
    setPhone(masked.backward);
  }
};
```
