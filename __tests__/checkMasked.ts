import * as maskfx from "../src";

describe("maskfx.checkMasked()", () => {
  describe("mask: '+7 (DDD) DDD-DD-DD'", () => {
    const mask = "+7 (DDD) DDD-DD-DD";

    describe("positive", () => {
      test("'+7 (999) 123-12-12' : true", () => {
        const value = maskfx.checkMasked({
          mask,
          value: "+7 (999) 123-12-12",
        });

        const expected = true;

        expect(value)
          .toBe(expected);
      });

      test("'+7 (999) 123' : true", () => {
        const value = maskfx.checkMasked({
          mask,
          value: "+7 (999) 123",
        });

        const expected = true;

        expect(value)
          .toBe(expected);
      });

      test("'+7 (999) 123-00-' : true", () => {
        const value = maskfx.checkMasked({
          mask,
          value: "+7 (999) 123-00-",
        });

        const expected = true;

        expect(value)
          .toBe(expected);
      });

      test("'' : true", () => {
        const value = maskfx.checkMasked({
          mask,
          value: "",
        });

        const expected = true;

        expect(value)
          .toBe(expected);
      });
    });

    describe("negative", () => {
      test("'+7 (999) 123-00-ww' : false", () => {
        const value = maskfx.checkMasked({
          mask,
          value: "+7 (999) 123-00-ww",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'wwwf' : false", () => {
        const value = maskfx.checkMasked({
          mask,
          value: "wwwf",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'+7 w' : false", () => {
        const value = maskfx.checkMasked({
          mask,
          value: "+7 w",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'+7 (99) 123' : false", () => {
        const value = maskfx.checkMasked({
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
