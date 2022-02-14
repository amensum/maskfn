import * as maskfx from "../src";
import { PredictMode } from "../src";

describe("maskfx.predictForward()", () => {
  describe("mask: '+7 (DDD) DDD-DD-DD'", () => {
    const mask = "+7 (DDD) DDD-DD-DD";

    describe("positive", () => {
      test("'+7 (999) 111-22' : '+7 (999) 111-22'", () => {
        const value = maskfx.predictForward({
          mask,
          value: "+7 (999) 111-22",
          mode: PredictMode.Lazy,
        });

        const expected = "+7 (999) 111-22";

        expect(value)
          .toBe(expected);
      });

      test("'+7 (999) 111-223' : '+7 (999) 111-22-3'", () => {
        const value = maskfx.predictForward({
          mask,
          value: "+7 (999) 111-223",
          mode: PredictMode.Lazy,
        });

        const expected = "+7 (999) 111-22-3";

        expect(value)
          .toBe(expected);
      });

      test("'9' : '+7 (9'", () => {
        const value = maskfx.predictForward({
          mask,
          value: "9",
          mode: PredictMode.Lazy,
        });

        const expected = "+7 (9";

        expect(value)
          .toBe(expected);
      });

      test("'+7 (9991' : '+7 (999) 1'", () => {
        const value = maskfx.predictForward({
          mask,
          value: "+7 (9991",
          mode: PredictMode.Lazy,
        });

        const expected = "+7 (999) 1";

        expect(value)
          .toBe(expected);
      });

      test("'' : ''", () => {
        const value = maskfx.predictForward({
          mask,
          value: "",
          mode: PredictMode.Lazy,
        });

        const expected = "";

        expect(value)
          .toBe(expected);
      });
    });

    describe("negative", () => {
      test("'+7 (999) 1 -22' : false", () => {
        const value = maskfx.predictForward({
          mask,
          value: "+7 (999) 1 -22",
          mode: PredictMode.Lazy,
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'+7 (999) 111-22-334' : false", () => {
        const value = maskfx.predictForward({
          mask,
          value: "+7 (999) 111-22-334",
          mode: PredictMode.Lazy,
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'+7 (999) 111-22-33w' : false", () => {
        const value = maskfx.predictForward({
          mask,
          value: "+7 (999) 111-22-33w",
          mode: PredictMode.Lazy,
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'+7 (99w' : false", () => {
        const value = maskfx.predictForward({
          mask,
          value: "+7 (99w",
          mode: PredictMode.Lazy,
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });

      test("'w' : false", () => {
        const value = maskfx.predictForward({
          mask,
          value: "w",
          mode: PredictMode.Lazy,
        });

        const expected = false;

        expect(value)
          .toBe(expected);
      });
    });
  });
});
