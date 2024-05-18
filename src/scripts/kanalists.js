import { hiragana } from "./hiragana.js";
import { katakana } from "./katakana.js";
import { voicedHiragana } from "./voicedhiragana.js";
import { voicedKatakana } from "./voicedkatakana.js";
import { youonHiragana } from "./youonhiragana.js";
import { youonKatakana } from "./youonkatakana.js";
import { voicedYouonHiragana } from "./voicedyouonhiragana.js";
import { voicedYouonKatakana } from "./voicedyouonkatakana.js";

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
      throw new RangeError(`Invalid kana type: ${kanaType}`);
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
