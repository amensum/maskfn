import * as maskfx from "../src";

describe("maskfx.transformUnmask()", () => {
  describe("mask: '+7 (DDD) DDD-DD-DD'", () => {
    const mask = "+7 (DDD) DDD-DD-DD";

    describe("positive", () => {
      test("'+7 (999) 123-12-12' : '9991231212'", () => {
        const value = maskfx.transformUnmask({
          mask,
          value: "+7 (999) 123-12-12",
        });

        const expected = "9991231212";

        expect(value)
          .toBe(expected);
      });

      test("'+7 (999) 123' : '999123'", () => {
        const value = maskfx.transformUnmask({
          mask,
          value: "+7 (999) 123",
        });

        const expected = "999123";

        expect(value)
          .toBe(expected);
      });

      test("'+7 (999) 123-00-' : '99912300'", () => {
        const value = maskfx.transformUnmask({
          mask,
          value: "+7 (999) 123-00-",
        });

        const expected = "99912300";

        expect(value)
          .toBe(expected);
      });

      test("'' : ''", () => {
        const value = maskfx.transformUnmask({
          mask,
          value: "",
        });

        const expected = "";

        expect(value)
          .toBe(expected);
      });
    });

    describe("negative", () => {
      test("'+7 (999) 123-00-ww' : false", () => {
        const value = maskfx.transformUnmask({
          mask,
          value: "+7 (999) 123-00-ww",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'+7 (99w)' : false", () => {
        const value = maskfx.transformUnmask({
          mask,
          value: "+7 (99w)",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'+7 (999) 123-12-120' : false", () => {
        const value = maskfx.transformUnmask({
          mask,
          value: "+7 (999) 123-12-120",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'+7 (99) 123' : false", () => {
        const value = maskfx.transformUnmask({
          mask,
          value: "+7 (99) 123",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });
    });
  });
});
