import { assert } from "chai";

import defaults from "../src/scripts/defaults.js";
import kanaLists from "../src/scripts/kanalists";
import { getNextKana, setKanaList } from "../src/scripts/background.js";

setKanaList({
  kanaType: "all",
  voiced: true,
  youon: true
});

describe("background", function() {
  describe("getNextKana", function() {
    it("should not return the same kana on consecutive calls", function() {
      var lastKana = {};

      for (var run = 0; run < 5000; ++run) {
        var kana = getNextKana();
        assert.notEqual(kana.japanese, lastKana.japanese);
        lastKana = kana;
      }
    });
  });
});
