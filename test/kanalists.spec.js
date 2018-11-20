import { assert } from "chai";

import kanaLists from "../src/scripts/kanalists";
import { hiragana } from "../src/scripts/hiragana";
import { voicedHiragana } from "../src/scripts/voicedhiragana";
import { youonHiragana } from "../src/scripts/youonhiragana";
import { voicedYouonHiragana } from "../src/scripts/voicedyouonhiragana";

describe("kanaLists", function() {
  describe("get", function() {
    it("returns basic kana scripts", function() {
      const result = kanaLists.get({
        kanaType: "hiragana",
        voiced: false,
        youon: false
      });
      assert.deepEqual(result, hiragana);
    });

    it("returns basic and voiced kana when voiced requested", function() {
      const result = kanaLists.get({
        kanaType: "hiragana",
        voiced: true,
        youon: false
      });

      assert.deepEqual(result, [...hiragana, ...voicedHiragana]);
    });

    it("returns basic and youon kana when youon requested", function() {
      const result = kanaLists.get({
        kanaType: "hiragana",
        voiced: false,
        youon: true
      });

      assert.deepEqual(result, [...hiragana, ...youonHiragana]);
    });

    it("returns all kana when voiced/youon requested", function() {
      const result = kanaLists.get({
        kanaType: "hiragana",
        voiced: true,
        youon: true
      });

      assert.deepEqual(result, [
        ...hiragana,
        ...voicedHiragana,
        ...youonHiragana,
        ...voicedYouonHiragana
      ]);
    });
  });
});
