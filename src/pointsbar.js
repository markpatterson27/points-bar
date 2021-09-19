/**
 * Functions for creating and saving svg points bar.
 */

// split points input into current points, max points parts. return as list of 2.
function splitPoints(points) {

    // throw error if points not string
    if (typeof points !== 'string') {
        throw new TypeError("Points input not a string");
    }

    const pointsParts = points.split("/");

    // throw error if not 2 parts
    if (pointsParts.length != 2) {
        throw new Error("Points input incorrectly formatted")
    }

    // throw error if parts are not numbers
    for (let part of pointsParts) {
        if (isNaN(part)) {
            throw new TypeError("Points part not a number");
        }
    }

    return pointsParts;
}

// returns svg string
function templateSVG(currentPoints, maxPoints, styleOptions = {}) {
    const style = {
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
        fontColor: '#868E96',
        barBackground: '#EEEEEE',
        barColor: '#0170F0',
        width: 120,
        ...styleOptions
    };

    const points = `${currentPoints}/${maxPoints}`;
    const percentage = Math.min(Math.floor((currentPoints / maxPoints) * 100), 100);

    // throw error if percentage not number
    if (isNaN(percentage)) {
        throw new TypeError("Can not calculate percentage from inputs");
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${style.width}px" height="36px">
    <title>Points: ${points}</title>
    <svg y="6px" height="16px" font-size="16px" font-family="${style.fontFamily}" fill="${style.fontColor}">
      <text x="0" y="12">Points</text>
      <text x="${style.width}" y="12" text-anchor="end">${points}</text>
    </svg>
    <svg y="24" width="${style.width}px" height="6px">
      <rect rx="3" width="100%" height="100%" fill="${style.barBackground}" />
      <rect rx="3" width="0%" height="100%" fill="${style.barColor}">
        <animate attributeName="width" begin="0.5s" dur="600ms" from="0" to="${percentage}%" repeatCount="1" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1"/>
      </rect>
    </svg>
    </svg>`;
}

module.exports = { splitPoints, templateSVG }
