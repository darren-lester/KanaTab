import defaults from "./defaults.js";
import { set as setTheme } from "./theme.js";
import { displayContent } from "./display.js";

// set theme
chrome.storage.sync.get(
  {
    theme: defaults.theme
  },
  opts => setTheme(opts.theme)
);

// update when options change
chrome.storage.onChanged.addListener(function(changes) {
  // set theme

  if (changes.theme) {
    let customTheme = changes.customTheme
      ? changes.customTheme.newValue
      : undefined;
    setTheme(changes.theme.newValue, customTheme);
  } else if (changes.customTheme) {
    // if current theme is custom then we must update theme
    chrome.storage.sync.get("theme", function(opts) {
      if (opts.theme === "custom") {
        setTheme(opts.theme, changes.customTheme.newValue);
      }
    });
  }

  // display content
  if (
    changes.hasOwnProperty("mode") ||
    changes.hasOwnProperty("kanaType") ||
    changes.hasOwnProperty("voiced") ||
    changes.hasOwnProperty("youon")
  ) {
    chrome.storage.sync.get(null, opts => displayContent(opts));
  }
});

// display content
chrome.storage.sync.get(
  {
    mode: defaults.mode,
    kanaType: defaults.kanaType,
    voiced: defaults.voiced,
    youon: defaults.youon
  },
  init
);

function init(opts) {
  chrome.runtime.sendMessage({
    action: "SET_KANA_LIST",
    payload: opts
  });

  displayContent(opts);
}
