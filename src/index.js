const core = require('@actions/core');
const pointsbar = require('./pointsbar');

const fs = require("fs");


async function run() {
    try {
        const points = core.getInput("points");
        const path = core.getInput("path");

        const pointsParts = pointsbar.splitPoints(points);

        const svg = pointsbar.templateSVG(pointsParts[0], pointsParts[1]);

        fs.writeFile(path, svg, function (err) {
            if (err) return console.log(err);
            console.log(`SVG bar > ${path}`);
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
