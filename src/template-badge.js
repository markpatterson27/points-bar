module.exports = (points, percentage, styleOptions = {}) => {
    const style = {
        fontFamily: 'Verdana, DejaVu Sans, sans-serif',
        fontColor: '#FFFFFF',
        barBackground: '#888888',
        barColor: '#33CC11',
        width: 140,
        reverse: false,
        ...styleOptions
    };
    const transform = (style.reverse) ? `scale(-1,1) translate(-${style.width - 43},0)` : ``;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${style.width}px" height="20px" role="img" aria-label="Points: ${points}">
    <title>Points: ${points}</title>
    <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <mask id="m"><rect width="100%" height="100%" rx="3" fill="#FFF"/></mask>
    <g mask="url(#m)">
        <rect x="0" y="0" width="43" height="20" fill="#444"/>
        <svg x="43" y="0" width="${style.width - 43}" height="20">
            <rect width="100%" height="100%" fill="${style.barBackground}"/>
            <rect width="0%" height="100%" fill="${style.barColor}" transform="${transform}">
                <animate attributeName="width" begin="0.5s" dur="600ms" from="0%" to="${percentage}%" repeatCount="1" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1"/>
            </rect>
        </svg>
        <rect width="${style.width}" height="20" fill="url(#a)"/>
    </g>
    <g aria-hidden="true" fill="${style.fontColor}" font-family="${style.fontFamily}" font-size="11">
        <text x="6" y="15" fill="#000" opacity="0.25">Points</text>
        <text x="5" y="14">Points</text>
        <text x="${style.width - 5}" y="15" fill="#000" opacity="0.25" text-anchor="end">${points}</text>
        <text x="${style.width - 6}" y="14" text-anchor="end">${points}</text>
    </g>
</svg>`
}
