"use strict";
import defaults from "./defaults";

export function set(theme, customTheme) {
	if(theme === "custom") {

		if(customTheme) {
			setCustom(customTheme);
		} else {
			chrome.storage.sync.get({customTheme: defaults.customTheme
			}, items => setCustom(items.customTheme));
		}

	} else {
		document.getElementById("theme").href = `style/themes/${theme}.css`;
		// now remove custom theme
		removeCustom();
	}
}

function setAllStyle(elements, property, value) {
	const elementArray = Array.prototype.slice.call(elements);
	elementArray.forEach(elem => elem.style[property] = value);
}

function setCustom(customTheme){
	// set background colour
	const body = document.getElementsByTagName("body")[0];
	body.style.backgroundColor = customTheme.background;

	// set tables
	setAllStyle(document.getElementsByTagName("td"), "backgroundColor", customTheme.table);
	
	// set japanese
	setAllStyle(document.getElementsByClassName("jap"), "color", customTheme.jap);

	// set english
	setAllStyle(document.getElementsByClassName("eng"), "color", customTheme.eng);

	// set captions
	setAllStyle(document.getElementsByTagName("caption"), "color", customTheme.caption);
}

function removeCustom() {
	// set background colour
	const body = document.getElementsByTagName("body")[0];
	body.style.backgroundColor = "";

	// set tables
	setAllStyle(document.getElementsByTagName("td"), "backgroundColor", "");
	
	// set japanese
	setAllStyle(document.getElementsByClassName("jap"), "color", "");

	// set english
	setAllStyle(document.getElementsByClassName("eng"), "color", "");

	// set captions
	setAllStyle(document.getElementsByTagName("caption"), "color", "");
}
