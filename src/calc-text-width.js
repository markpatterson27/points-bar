module.exports = function textWidth(text, fontFamily = 'Verdana', fontSize = '11px') {
    let width;
    if (fontFamily == 'Verdana' && fontSize == '11px') {
        const widthsVerdana11px = require('./widths-verdana-11px.json');
        width = text
            .split('')
            .map(c => widthsVerdana11px[c.charCodeAt(0)])
            .reduce((cur, acc) => acc + cur);
    }

    // truncate to 1 decimal place
    return Math.round(width * 10) / 10;
}
