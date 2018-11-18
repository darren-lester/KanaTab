"use strict";

import {hiragana} from "./hiragana";
import {katakana} from "./katakana";
import {voicedHiragana} from "./voicedhiragana";
import {voicedKatakana} from "./voicedkatakana";
import {youonHiragana} from "./youonhiragana";
import {youonKatakana} from "./youonkatakana";
import {voicedYouonHiragana} from "./voicedyouonhiragana";
import {voicedYouonKatakana} from "./voicedyouonkatakana";

const hiraganaKatakana = hiragana.concat(katakana);

const hiraganaVoiced = hiragana.concat(voicedHiragana);
const katakanaVoiced = katakana.concat(voicedKatakana);
const hiraganaKatakanaVoiced = hiraganaVoiced.concat(katakanaVoiced);

const hiraganaYouon = hiragana.concat(youonHiragana);
const katakanaYouon = katakana.concat(youonKatakana);
const hiraganaKatakanaYouon = hiraganaYouon.concat(katakanaYouon);

const hiraganaVoicedYouon = hiraganaVoiced.concat(youonHiragana).
							concat(voicedYouonHiragana);
const katakanaVoicedYouon = katakanaVoiced.concat(youonKatakana).
							concat(voicedYouonKatakana);
const hiraganaKatakanaVoicedYouon = hiraganaVoicedYouon.concat(katakanaVoicedYouon);

export default {
	hiragana,
	katakana,
	hiraganaKatakana,
	hiraganaVoiced,
	katakanaVoiced,
	hiraganaKatakanaVoiced,
	hiraganaYouon,
	katakanaYouon,
	hiraganaKatakanaYouon,
	hiraganaVoicedYouon,
	katakanaVoicedYouon,
	hiraganaKatakanaVoicedYouon
};
