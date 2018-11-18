"use strict";
import * as defaults from "./defaults";
import kanaLists from "./kanalists";

let kanaList = null;
let lastKana = "";

global.setKanaList = function({kanaType, voiced, youon}) {
	
	const hiraganaTypes = [kanaLists.hiragana, kanaLists.hiraganaVoiced, kanaLists.hiraganaYouon, kanaLists.hiraganaVoicedYouon];
	const katakanaTypes = [kanaLists.katakana, kanaLists.katakanaVoiced, kanaLists.katakanaYouon, kanaLists.katakanaVoicedYouon];
	const allTypes = [kanaLists.hiraganaKatakana, kanaLists.hiraganaKatakanaVoiced, kanaLists.hiraganaKatakanaYouon, kanaLists.hiraganaKatakanaVoicedYouon];

	let listType = null;
	switch(kanaType) {
		case "hiragana":
			listType = hiraganaTypes;
			break;
		case "katakana":
			listType = katakanaTypes;
			break;
		case "all":
			listType = allTypes;
			break;
		default:
			console.log("invalid kana type:", kanaType);
	}

	if(voiced && youon) {
		kanaList = listType[3];
	}
	else if (voiced){
		kanaList = listType[1];
	}
	else if (youon){
		kanaList = listType[2];
	}
	else {
		kanaList = listType[0];
	}
};

//set callback for updating kanaList when changed in options
chrome.storage.onChanged.addListener(function(){
	chrome.storage.sync.get(["kanaType", "voiced", "youon"], items => setKanaList(items));
});

function getRandomKana() {
	const i = Math.floor(Math.random() * kanaList.length);
	return kanaList[i];
}

global.getNextKana = function() {
	let kana = getRandomKana();

	while(kana === lastKana) {
		kana = getRandomKana();
	}

	lastKana = kana;

	return kana;
};
