import * as maskfx from "../src";

describe("maskfx.transformMask()", () => {
  describe("mask: '+7 (DDD) DDD-DD-DD'", () => {
    const mask = "+7 (DDD) DDD-DD-DD";

    describe("positive", () => {
      test("'9991231212' : '+7 (999) 123-12-12'", () => {
        const value = maskfx.transformMask({
          mask,
          value: "9991231212",
        });

        const expected = "+7 (999) 123-12-12";

        expect(value)
          .toBe(expected);
      });

      test("'99912312' : '+7 (999) 123-12'", () => {
        const value = maskfx.transformMask({
          mask,
          value: "99912312",
        });

        const expected = "+7 (999) 123-12";

        expect(value)
          .toBe(expected);
      });

      test("'9' : '+7 (9'", () => {
        const value = maskfx.transformMask({
          mask,
          value: "9",
        });

        const expected = "+7 (9";

        expect(value)
          .toBe(expected);
      });

      test("'' : ''", () => {
        const value = maskfx.transformMask({
          mask,
          value: "",
        });

        const expected = "";

        expect(value)
          .toBe(expected);
      });
    });

    describe("negative", () => {
      test("'999wa12312' : false", () => {
        const value = maskfx.transformMask({
          mask,
          value: "999wa12312",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'99912312120' : false", () => {
        const value = maskfx.transformMask({
          mask,
          value: "99912312120",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'99912312w' : false", () => {
        const value = maskfx.transformMask({
          mask,
          value: "99912312w",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'w' : false", () => {
        const value = maskfx.transformMask({
          mask,
          value: "w",
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });
    });
  });
});
