"use strict";
import defaults from "./defaults";
import kanaLists from "./kanalists";

let kanaList = null;
let lastKana = "";

//set callback for updating kanaList when changed in options
chrome.storage.onChanged.addListener(function() {
  chrome.storage.sync.get(["kanaType", "voiced", "youon"], setKanaList);
});

function getRandomKana() {
  const i = Math.floor(Math.random() * kanaList.length);
  return kanaList[i];
}

global.setKanaList = function(options) {
  kanaList = kanaLists.get(options);
};

global.getNextKana = function() {
  let kana;

  do {
    kana = getRandomKana();
  } while (kana === lastKana);

  lastKana = kana;
  return kana;
};
