let defaultFontFamily = "Arial";

let localFontsEl = document.querySelector("#local-fonts");

let uppercaseContainer  = document.querySelector("#uppercase-container");
let lowercaseContainer  = document.querySelector("#lowercase-container");
let digitsContainer     = document.querySelector("#digits-container");
let otherContainer      = document.querySelector("#other-container");

let uppercaseLettersBox = document.querySelector("#uppercase-letters");
let lowercaseLettersBox = document.querySelector("#lowercase-letters");
let digitsBox           = document.querySelector("#digits");
let otherCharsBox       = document.querySelector("#other-chars");

localFontsEl.addEventListener("input", changeFontFamily);

uppercaseLettersBox.addEventListener("input", printUppercaseLetters);
lowercaseLettersBox.addEventListener("input", printLowercaseLetters);
digitsBox.addEventListener("input", printDigits);
otherCharsBox.addEventListener("input", printOtherCharacters);
[
    uppercaseLettersBox,
    lowercaseLettersBox,
    digitsBox,
    otherCharsBox,
].forEach(el => el.dispatchEvent(new Event("input")));