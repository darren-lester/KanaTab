import kanaLists from "./kanalists.js";

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

chrome.runtime.onMessage.addListener(
  function(request, _sender) {
    if (request.action === "SET_KANA_LIST") {
      setKanaList(request.payload)
    }
  }
);

chrome.runtime.onMessage.addListener(
  function(request, _sender, sendResponse) {
    if (request.action === "GET_NEXT_KANA") {
      sendResponse(getNextKana())
    }
  }
);

