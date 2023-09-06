async function loadLocalFonts(callerBtn) {
    let fonts = await getFontData();
    if (fonts.length == 0) {
        return;
    }
    localFontSelect.lastElementChild.remove();
    Object.keys(fonts).forEach(family => {
        let selected = "";
        if (family == defaultFontFamily) {
            selected = " selected";
        }
        localFontSelect.innerHTML += `
            <option${selected} style="font-family: '${family}'">${family}</option>
        `;
    });
    callerBtn.remove();
}

function changeFontFamily() {
    let value = localFontSelect.value;
    if (value == localFontSelect.dataset.placeholder) {
        value = defaultFontFamily;
    }
    document.body.style.setProperty("--font-family", value);
    updateCharWidthRatiosDict();
}

function printUppercaseLetters() {
    uppercaseContainer.innerHTML = "";
    uppercaseLettersBox.value.split("").forEach(letter => {
        uppercaseContainer.innerHTML += `<div class="bg-white shadow">${letter}</div>`;
    });
    updateCharWidthRatiosDict(uppercaseContainer);
}
function printLowercaseLetters() {
    lowercaseContainer.innerHTML = "";
    lowercaseLettersBox.value.split("").forEach(letter => {
        lowercaseContainer.innerHTML += `<div class="bg-white shadow">${letter}</div>`;
    });
    updateCharWidthRatiosDict(lowercaseContainer);
}
function printDigits() {
    digitsContainer.innerHTML = "";
    digitsBox.value.split("").forEach(digit => {
        digitsContainer.innerHTML += `<div class="bg-white shadow">${digit}</div>`;
    });
    updateCharWidthRatiosDict(digitsContainer);
}
function printOtherCharacters() {
    otherContainer.innerHTML = "";
    otherCharsBox.value.split("").forEach(letter => {
        otherContainer.innerHTML += `<div class="bg-white shadow">${letter}</div>`;
    });
    updateCharWidthRatiosDict(otherContainer);
}

function getCharContainers() {
    return {
        uppercase : uppercaseContainer,
        lowercase : lowercaseContainer,
        digit     : digitsContainer,
        other     : otherContainer,
    };
}

function updateCharWidthRatiosDict(containers) {
    if (containers instanceof HTMLElement) {
        containers = [containers];
    }
    containers = containers || Object.values(getCharContainers());
    for (const container of containers) {
        let containerRatios = calculateCharWidthRatios(container);
        charWidthRatiosDict = Object.assign(charWidthRatiosDict, containerRatios);
    }
}