const textWidth = require('../src/calc-text-width');

const testWidths = [
    // text, expectedWidth
    ['Points', 33],
    ['Grade', 35],
    ['Score', 31],
    ['Autograde', 59],
    ['Banana', 43]
];
test.each(testWidths)("text '%s' returns width '%d'", (text, expectedWidth) => {
    // expect(textWidth(text)).toBeCloseTo(expectedWidth, 3);

    const width = textWidth(text);

    console.log(`For '${text}' returned: ${width}`)

    const between = (expectedWidth-2 < textWidth(text) && textWidth(text) < expectedWidth+2);
    expect(between).toBe(true);
});
