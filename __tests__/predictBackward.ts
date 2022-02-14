import * as maskfx from "../src";
import { PredictMode } from "../src";

describe("maskfx.predictBackward()", () => {
  describe("mask: '+7 (DDD) DDD-DD-DD'", () => {
    const mask = "+7 (DDD) DDD-DD-DD";

    describe("PredictMode.Lazy", () => {
      describe("positive", () => {
        test("'+7 (999) 111-22' : '+7 (999) 111-2'", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 111-22",
            mode: PredictMode.Lazy,
          });

          const expected = "+7 (999) 111-2";

          expect(value)
            .toBe(expected);
        });

        test("'+7 (999) 111-22-' : '+7 (999) 111-22-'", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 111-22-",
            mode: PredictMode.Lazy,
          });

          const expected = "+7 (999) 111-22-";

          expect(value)
            .toBe(expected);
        });

        test("'+7 (999) 1' : '+7 (999) 1'", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 1",
            mode: PredictMode.Lazy,
          });

          const expected = "+7 (999) 1";

          expect(value)
            .toBe(expected);
        });

        test("'+7 (999)' : '+7 (99'", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999)",
            mode: PredictMode.Lazy,
          });

          const expected = "+7 (99";

          expect(value)
            .toBe(expected);
        });
      });

      describe("negative", () => {
        test("'+7 (999) 111-22-w' : false", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 111-22-w",
            mode: PredictMode.Lazy,
          });

          const expected = false;

          expect(value)
            .toBe(expected);
        });

        test("'+7 (999) 111- ' : false", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 111- ",
            mode: PredictMode.Lazy,
          });

          const expected = false;

          expect(value)
            .toBe(expected);
        });

        test("'+7 (99w) 1' : false", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (99w) 1",
            mode: PredictMode.Lazy,
          });

          const expected = false;

          expect(value)
            .toBe(expected);
        });

        test("'+7 (w' : false", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (w",
            mode: PredictMode.Lazy,
          });

          const expected = false;

          expect(value)
            .toBe(expected);
        });
      });
    });

    describe("PredictMode.Fast", () => {
      describe("positive", () => {
        test("'+7 (999) 111-22' : '+7 (999) 111-22'", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 111-22",
            mode: PredictMode.Fast,
          });

          const expected = "+7 (999) 111-22";

          expect(value)
            .toBe(expected);
        });

        test("'+7 (999) 111-22-' : '+7 (999) 111-22'", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 111-22-",
            mode: PredictMode.Fast,
          });

          const expected = "+7 (999) 111-22";

          expect(value)
            .toBe(expected);
        });

        test("'+7 (999) 1' : '+7 (999) 1'", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 1",
            mode: PredictMode.Fast,
          });

          const expected = "+7 (999) 1";

          expect(value)
            .toBe(expected);
        });

        test("'+7 (999)' : '+7 (999'", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999)",
            mode: PredictMode.Fast,
          });

          const expected = "+7 (999";

          expect(value)
            .toBe(expected);
        });
      });

      describe("negative", () => {
        test("'+7 (999) 111-22-w' : false", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 111-22-w",
            mode: PredictMode.Fast,
          });

          const expected = false;

          expect(value)
            .toBe(expected);
        });

        test("'+7 (999) 111- ' : false", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (999) 111- ",
            mode: PredictMode.Fast,
          });

          const expected = false;

          expect(value)
            .toBe(expected);
        });

        test("'+7 (99w) 1' : false", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (99w) 1",
            mode: PredictMode.Fast,
          });

          const expected = false;

          expect(value)
            .toBe(expected);
        });

        test("'+7 (w' : false", () => {
          const value = maskfx.predictBackward({
            mask,
            value: "+7 (w",
            mode: PredictMode.Fast,
          });

          const expected = false;

          expect(value)
            .toBe(expected);
        });
      });
    });
  });
});
