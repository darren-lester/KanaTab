"use strict";
import defaults from "./defaults";
import kanaLists from "./kanalists";

let kanaList = null;
let lastKana = "";

global.setKanaList = function(options) {
  kanaList = kanaLists.get(options);
};

//set callback for updating kanaList when changed in options
chrome.storage.onChanged.addListener(function() {
  chrome.storage.sync.get(["kanaType", "voiced", "youon"], setKanaList);
});

function getRandomKana() {
  const i = Math.floor(Math.random() * kanaList.length);
  return kanaList[i];
}

global.getNextKana = function() {
  let kana = getRandomKana();

  while (kana === lastKana) {
    kana = getRandomKana();
  }

  lastKana = kana;

  return kana;
};
