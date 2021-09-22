const core = require('@actions/core');
const pointsbar = require('./pointsbar');

async function run() {
    try {
        const points = core.getInput("points", {required: true});
        const filepath = core.getInput("path", {required: true});
        const barType = core.getInput("type");
        const barColor = core.getInput("bar-color");
        const barBackground = core.getInput("bar-background");
        const reverse = (core.getInput("reverse").toLowerCase() === 'true') ? true : false;

        const styleOptions = {
            ...(barColor ? { barColor } : {}),
            ...(barBackground ? { barBackground } : {}),
            ...(reverse ? { reverse } : {})
        };

        const pointsParts = pointsbar.splitPoints(points);

        const svg = pointsbar.templateSVG(pointsParts[0], pointsParts[1], barType, styleOptions);

        pointsbar.writeSVGFile(filepath, svg);

    } catch (error) {
        core.setFailed(error.message);
    }
}

if (require.main === module) {
  run();
}

module.exports = { run };
