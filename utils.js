async function getFontData() {
    try {
        let fonts = await window.queryLocalFonts();
        let fontFamilies = groupByProperty(fonts, "family");
        return fontFamilies;
    } catch (err) {
        console.error(err.name, err.message);
    }
    return {};
}

function groupByProperty(arr, property) {
    return arr.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

function calculateCharWidthRatios(containers) {
    let charWidths = {
        uppercase : {},
        lowercase : {},
        digit     : {},
        other     : {},
    };
    for (let containerName in containers) {
        let containerEl = containers[containerName];
        for (let charEl of Array.from(containerEl.children)) {
            let char = charEl.textContent.trim();
            if (char == "") {
                char = " ";
            }
            let width  = getComputedStyle(charEl).width;
            let height = getComputedStyle(charEl).height;
            width  = parseFloat(width);
            height = parseFloat(height);
            let widthRatio = width / height;
            charWidths[containerName][char] = widthRatio;
        }
    }
    return charWidths;
}