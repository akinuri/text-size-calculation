async function loadLocalFonts(callerBtn) {
    let fonts = await getFontData();
    if (fonts.length == 0) {
        return;
    }
    localFontsEl.lastElementChild.remove();
    Object.keys(fonts).forEach(family => {
        let selected = "";
        if (family == defaultFontFamily) {
            selected = " selected";
        }
        localFontsEl.innerHTML += `
            <option${selected} style="font-family: '${family}'">${family}</option>
        `;
    });
    callerBtn.remove();
}

function changeFontFamily() {
    let value = localFontsEl.value;
    if (value == localFontsEl.dataset.placeholder) {
        value = defaultFontFamily;
    }
    document.body.style.setProperty("--font-family", value);
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