module.exports = (points, percentage, label = 'Points', styleOptions = {}) => {
    const style = {
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
        fontColor: '#868E96',
        barBackground: '#EEEEEE',
        barColor: '#0170F0',
        width: 120,
        reverse: false,
        ...styleOptions
    };
    const transform = (style.reverse) ? `scale(-1,1) translate(-${style.width},0)` : ``;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${style.width}px" height="36px" role="img" aria-label="${label}: ${points}">
    <title>${label}: ${points}</title>
    <svg y="6px" height="16px" font-size="16px" font-family="${style.fontFamily}" fill="${style.fontColor}">
        <text x="0" y="12">${label}</text>
        <text x="${style.width}" y="12" text-anchor="end">${points}</text>
    </svg>
    <svg y="24" width="${style.width}px" height="6px">
        <rect rx="3" width="100%" height="100%" fill="${style.barBackground}"/>
        <rect rx="3" width="0%" height="100%" fill="${style.barColor}" transform="${transform}">
            <animate attributeName="width" begin="0.5s" dur="600ms" from="0%" to="${percentage}%" repeatCount="1" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1"/>
        </rect>
    </svg>
</svg>`;
}
