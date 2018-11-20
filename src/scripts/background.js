"use strict";
import defaults from "./defaults";
import kanaLists from "./kanalists";

let kanaList = null;
let lastKana = "";

//set callback for updating kanaList when changed in options
if (global.chrome) {
  chrome.storage.onChanged.addListener(function() {
    chrome.storage.sync.get(["kanaType", "voiced", "youon"], setKanaList);
  });
}

function getRandomKana() {
  const i = Math.floor(Math.random() * kanaList.length);
  return kanaList[i];
}

export function setKanaList(options) {
  kanaList = kanaLists.get(options);
}

export function getNextKana() {
  let kana;

  do {
    kana = getRandomKana();
  } while (kana === lastKana);

  lastKana = kana;
  return kana;
}

global.setKanaList = setKanaList;
global.getNextKana = getNextKana;
