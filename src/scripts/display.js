// Author: Darren Lester

"use strict";

export function displayContent(opts) {
	switch(opts.mode) {
		case "flash-card":
			hideReferenceTables();
			displayFlashCard();
			break;
		case "reference-tables":
			hideFlashCard();
			hideReferenceTables();
			displayReferenceTables(opts);
			break;
		default:
			console.log("unsupported mode:", opts.mode);
	}
	if (opts.adverts) {
		document.getElementById("kana-advert").style.display = "flex";
	}
	else {
		document.getElementById("kana-advert").style.display = "none";
	}
}

function displayFlashCard() {
	const kana = chrome.extension.getBackgroundPage().getNextKana();

	document.getElementById("item").innerText = kana.japanese;
	document.getElementById("translation").innerText = kana.english;

	document.getElementById("card").style.display = "block";

	var kanaAdvert = document.getElementById("kana-advert");
	kanaAdvert.classList.add("flashcard");
	kanaAdvert.classList.remove("tables");
}

function displayReferenceTables(opts) {
	
	function display(element){
		element.style.display = "block";
	}

	function displayHiragana() {
		display(document.getElementById("hiragana-table"));
		
		if(opts.voiced) {
			display(document.getElementById("voiced-hiragana-table"));
		}

		if(opts.youon){
			display(document.getElementById("youon-hiragana-table"));
		}

		if(opts.voiced && opts.youon) {
			display(document.getElementById("voiced-youon-hiragana-table"));
		}

		display(document.getElementById("hiragana-tables"));
	}

	function displayKatakana() {
		display(document.getElementById("katakana-table"));
		
		if(opts.voiced) {
			display(document.getElementById("voiced-katakana-table"));
		}

		if(opts.youon){
			display(document.getElementById("youon-katakana-table"));
		}

		if(opts.voiced && opts.youon) {
			display(document.getElementById("voiced-youon-katakana-table"));
		}

		display(document.getElementById("katakana-tables"));

	}

	switch(opts.kanaType) {
		case "all":
			displayHiragana();
			displayKatakana();
			break;
		case "hiragana":
			displayHiragana();
			break;
		case "katakana":
			displayKatakana();
			break;
		default:
			console.log("unrecognised kana type");
	}

	var kanaAdvert = document.getElementById("kana-advert");
	kanaAdvert.classList.add("tables");
	kanaAdvert.classList.remove("flashcard");
}

function hideFlashCard() {
	document.getElementById("card").style.display = "none";
}

function hideReferenceTables() {
	const hiraganaTables = document.getElementById("hiragana-tables");
	const katakanaTables = document.getElementById("katakana-tables");

	hiraganaTables.style.display = "none";
	katakanaTables.style.display = "none";

	let referenceTables = document.getElementsByClassName("kana-table");
	referenceTables = Array.prototype.slice.call(referenceTables);
	referenceTables.forEach((t) => t.style.display = "none");
}
