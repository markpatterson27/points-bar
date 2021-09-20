const core = require('@actions/core');
const pointsbar = require('./pointsbar');

async function run() {
    try {
        const points = core.getInput("points");
        const filepath = core.getInput("path");

        const pointsParts = pointsbar.splitPoints(points);

        const svg = pointsbar.templateSVG(pointsParts[0], pointsParts[1]);

        pointsbar.writeSVGFile(filepath, svg);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
