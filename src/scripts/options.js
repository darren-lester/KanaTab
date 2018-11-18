// Author: Darren Lester

"use strict";
import * as defaults from "./defaults";

function saveOptions() {

	// get options from page

	const mode = getSelectedMode();

	const kanaType = document.getElementById("kana-type").value;
	const voiced = document.getElementById("voiced").checked;
	const youon = document.getElementById("youon").checked;

	const theme = document.getElementById("theme").value;

	const customTheme = {
		background: document.getElementById("custom-theme-background").value,
		table: document.getElementById("custom-theme-table").value,
		jap: document.getElementById("custom-theme-jap").value,
		eng: document.getElementById("custom-theme-eng").value,
		caption: document.getElementById("custom-theme-caption").value
	};

	chrome.storage.sync.set({
		mode,
		kanaType,
		voiced,
		youon,
		theme,
		customTheme
	}, function(){
		const status = document.getElementById("status");
		status.textContent = "Options saved";
		setTimeout(function(){
			status.textContent = "";
		}, 750);
	});
}

function restoreOptions() {

	chrome.storage.sync.get({
		mode: defaults.mode,
		kanaType: defaults.kanaType,
		voiced: defaults.voiced,
		youon: defaults.youon,
		theme: defaults.theme,
		customTheme: defaults.customTheme
	}, function(items){
		setSelectedMode(items.mode);
		document.getElementById("kana-type").value = items.kanaType;
		document.getElementById("voiced").checked = items.voiced;
		document.getElementById("youon").checked = items.youon;
		document.getElementById("theme").value = items.theme;
		setCustomThemeColours(items.customTheme);
		
		if(items.theme === "custom") {
			showCustomThemeOptions(true);	
		}
	});
}

function getModeOptions() {
	return document.getElementsByName("mode");
}

function getSelectedMode() {
	const modeOptions = getModeOptions();

	for(let i = 0; i < modeOptions.length; ++i) {
		let opt = modeOptions[i];
		if(opt.checked) {
			return opt.value;
		}
	}
}

function setSelectedMode(mode) {
	const modeOptions = getModeOptions();

	for(let i = 0; i < modeOptions.length; ++i) {
		let opt = modeOptions[i];
		if(opt.value === mode) {
			opt.checked = true;
		}
	}
}

function showCustomThemeOptions(show){
	const custom = document.getElementById("custom-theme-colours");
	
	if(show === true) {
		custom.style.display = "block";
	} else {
		custom.style.display = "none";
	}
}

function setCustomThemeColours(customTheme) {
	document.getElementById("custom-theme-background").value = customTheme.background;
	document.getElementById("custom-theme-table").value = customTheme.table;
	document.getElementById("custom-theme-jap").value = customTheme.jap;
	document.getElementById("custom-theme-eng").value = customTheme.eng;
	document.getElementById("custom-theme-caption").value = customTheme.caption;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
document.getElementById("theme").addEventListener("change", function(e){
	showCustomThemeOptions(e.target.value === "custom");
});
