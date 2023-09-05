let localFontsEl = document.querySelector("#local-fonts");

let lettersContainer = document.querySelector("#letters-container");

let uppercaseContainer  = document.querySelector("#uppercase-container");
let lowercaseContainer  = document.querySelector("#lowercase-container");
let digitsContainer     = document.querySelector("#digits-container");
let otherContainer      = document.querySelector("#other-container");

let uppercaseLettersBox = document.querySelector("#uppercase-letters");
let lowercaseLettersBox = document.querySelector("#lowercase-letters");
let digitsBox           = document.querySelector("#digits");
let otherCharsBox       = document.querySelector("#other-chars");

localFontsEl.addEventListener("change", () => {
    let value = localFontsEl.value;
    if (value == localFontsEl.dataset.placeholder) {
        value = "";
    }
    lettersContainer.style.fontFamily = value;
});

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

async function loadLocalFonts(callerBtn) {
    let fonts = await getFontData();
    if (fonts.length == 0) {
        return;
    }
    localFontsEl.lastElementChild.remove();
    Object.keys(fonts).forEach(family => {
        let selected = "";
        if (family == "Arial") {
            selected = " selected";
        }
        localFontsEl.innerHTML += `
            <option${selected} style="font-family: '${family}'">${family}</option>
        `;
    });
    callerBtn.remove();
}

function printUppercaseLetters() {
    uppercaseContainer.innerHTML = "";
    uppercaseLettersBox.value.split("").forEach(letter => {
        uppercaseContainer.innerHTML += `<div class="bg-white shadow">${letter}</div>`;
    });
}
function printLowercaseLetters() {
    lowercaseContainer.innerHTML = "";
    lowercaseLettersBox.value.split("").forEach(letter => {
        lowercaseContainer.innerHTML += `<div class="bg-white shadow">${letter}</div>`;
    });
}
function printDigits() {
    digitsContainer.innerHTML = "";
    digitsBox.value.split("").forEach(digit => {
        digitsContainer.innerHTML += `<div class="bg-white shadow">${digit}</div>`;
    });
}
function printOtherCharacters() {
    otherContainer.innerHTML = "";
    otherCharsBox.value.split("").forEach(letter => {
        otherContainer.innerHTML += `<div class="bg-white shadow">${letter}</div>`;
    });
}

function printCharWidthRatios() {
    let containers = {
        uppercase : uppercaseContainer,
        lowercase : lowercaseContainer,
        digit     : digitsContainer,
        other     : otherContainer,
    };
    let charWidthRatios = calculateCharWidthRatios(containers);
    for (let containerName in containers) {
        let containerEl = containers[containerName];
        for (let charEl of Array.from(containerEl.children)) {
            let char = charEl.textContent.trim();
            if (char == "") {
                char = " ";
            }
            charEl.title = charWidthRatios[containerName][char];
            charEl.classList.add("shadow", "shadow-sky-500/50");
        }
    }
}