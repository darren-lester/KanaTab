// Author: Darren Lester

"use strict";

import * as defaults from "./defaults";
import {set as setTheme} from "./theme";
import {displayContent} from "./display";

// set theme
chrome.storage.sync.get({
	theme: defaults.theme
}, opts => setTheme(opts.theme));

// update when options change
chrome.storage.onChanged.addListener(function(changes){
	
	// set theme 

	if(changes.theme) {
		let customTheme = changes.customTheme ? changes.customTheme.newValue : undefined;
		setTheme(changes.theme.newValue, customTheme);
	}
	else if(changes.customTheme) {
		// if current theme is custom then we must update theme
		chrome.storage.sync.get("theme", function(opts){
			if(opts.theme === "custom") {
				setTheme(opts.theme, changes.customTheme.newValue);
			}
		});
	}

	// display content
	if(changes.hasOwnProperty("mode") ||
		changes.hasOwnProperty("kanaType") ||
		changes.hasOwnProperty("voiced") || 
		changes.hasOwnProperty("youon")) {
		chrome.storage.sync.get(null, opts => displayContent(opts));
	}

	if (changes.hasOwnProperty("adverts")) {
		if (changes.adverts.newValue) {
			document.getElementById("kana-advert").style.display = "flex";
		}
		else {
			document.getElementById("kana-advert").style.display = "none";
		}
	}
});

// display content
chrome.storage.sync.get({
	mode: defaults.mode,
	kanaType: defaults.kanaType, 
	voiced: defaults.voiced,
	youon: defaults.youon,
	adverts: defaults.adverts
}, init);

function init(opts){

	const bg = chrome.extension.getBackgroundPage();

	if (!bg.setKanaList) {
		setTimeout(function(){init(opts)}, 0);
	}
	else {
		bg.setKanaList(opts);
		displayContent(opts);
	}
}
