import * as maskfx from "../src";

describe("maskfx.checkUnmasked()", () => {
  describe("mask: '+7 (DDD) DDD-DD-DD'", () => {
    const mask = "+7 (DDD) DDD-DD-DD";

    describe("positive", () => {
      test("'9991231212' : true", () => {
        const value = maskfx.checkUnmasked({
          mask,
          value: "9991231212",
        });

        const expected = true;

        expect(value)
          .toBe(expected);
      });

      test("'999' : true", () => {
        const value = maskfx.checkUnmasked({
          mask,
          value: "999",
        });

        const expected = true;

        expect(value)
          .toBe(expected);
      });

      test("'9' : true", () => {
        const value = maskfx.checkUnmasked({
          mask,
          value: "9",
        });

        const expected = true;

        expect(value)
          .toBe(expected);
      });

      test("'' : true", () => {
        const value = maskfx.checkUnmasked({
          mask,
          value: "",
        });

        const expected = true;

        expect(value)
          .toBe(expected);
      });
    });

    describe("negative", () => {
      test("'+7 (999) 123-12-12' : false", () => {
        const value = maskfx.checkUnmasked({
          mask,
          value: "+7 (999) 123-12-12",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'99912312120' : false", () => {
        const value = maskfx.checkUnmasked({
          mask,
          value: "99912312120",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'999123w12120' : false", () => {
        const value = maskfx.checkUnmasked({
          mask,
          value: "999123w12120",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'9991231w' : false", () => {
        const value = maskfx.checkUnmasked({
          mask,
          value: "9991231w",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });
    });
  });
});
