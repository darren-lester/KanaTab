"use strict";

import { hiragana } from "./hiragana";
import { katakana } from "./katakana";
import { voicedHiragana } from "./voicedhiragana";
import { voicedKatakana } from "./voicedkatakana";
import { youonHiragana } from "./youonhiragana";
import { youonKatakana } from "./youonkatakana";
import { voicedYouonHiragana } from "./voicedyouonhiragana";
import { voicedYouonKatakana } from "./voicedyouonkatakana";

const hiraganaSets = {
  basic: hiragana,
  voiced: [...hiragana, ...voicedHiragana],
  youon: [...hiragana, ...youonHiragana],
  voicedYouon: [
    ...hiragana,
    ...voicedHiragana,
    ...youonHiragana,
    ...voicedYouonHiragana
  ]
};

const katakanaSets = {
  basic: katakana,
  voiced: [...katakana, ...voicedKatakana],
  youon: [...katakana, ...youonKatakana],
  voicedYouon: [
    ...katakana,
    ...voicedKatakana,
    ...youonKatakana,
    ...voicedYouonKatakana
  ]
};

const allSets = {
  basic: [...hiraganaSets.basic, ...katakanaSets.basic],
  voiced: [...hiraganaSets.voiced, ...katakanaSets.voiced],
  youon: [...hiraganaSets.youon, ...katakanaSets.youon],
  voicedYouon: [...hiraganaSets.voicedYouon, ...katakanaSets.voicedYouon]
};

const characterSets = {
  hiragana: hiraganaSets,
  katakana: katakanaSets,
  all: allSets
};

const VALID_KANA_TYPES = ["hiragana", "katakana", "all"];

const isValidKanaType = kanaType => VALID_KANA_TYPES.includes(kanaType);

export default {
  get: ({ kanaType, voiced, youon }) => {
    if (!isValidKanaType(kanaType)) {
      throw new TypeError(`Invalid kana type: ${kanaType}`);
    }

    const characterSet = characterSets[kanaType];

    if (voiced && youon) {
      return characterSet.voicedYouon;
    } else if (voiced) {
      return characterSet.voiced;
    } else if (youon) {
      return characterSet.youon;
    } else {
      return characterSet.basic;
    }
  }
};
