var defaults = require("../tmp/defaults.js");

global.chrome = {
  storage: {
    sync: {
      get: function(items, callback) {
        items = {
          kanaType: "all",
          voiced: true,
          youon: true
        };
        callback(items);
      }
    },
    onChanged: {
      addListener: function() {}
    }
  }
};

require("../tmp/background.js");
var assert = require("chai").assert;

describe("getNextKana", function() {
  // kana return values

  it("should not return undefined", function() {
    for (var run = 0; run < 5000; ++run) {
      assert.notEqual(getNextKana(), undefined);
    }
  });

  it("should not return null", function() {
    for (var run = 0; run < 5000; ++run) {
      assert.notEqual(getNextKana(), null);
    }
  });

  // consecutive calls
  it("should not return the same kana on consecutive calls", function() {
    var lastKana = {};

    for (var run = 0; run < 5000; ++run) {
      var kana = getNextKana();
      assert.notEqual(kana.japanese, lastKana.japanese);
      lastKana = kana;
    }
  });
});

describe("random kana distribution", function() {});
