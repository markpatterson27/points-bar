/**
 * Functions for creating and saving svg points bar.
 */
const fs = require("fs");
const path = require("path");

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
function templateSVG(currentPoints, maxPoints, options = {}) {
    const type = options.type || 'default';
    const label = options.label || 'Points';
    const styleOptions = options.style || {};
    let svg = '';

    const points = `${currentPoints}/${maxPoints}`;
    const percentage = Math.min(Math.floor((currentPoints / maxPoints) * 100), 100);

    // throw error if percentage not number
    if (isNaN(percentage)) {
        throw new TypeError("Can not calculate percentage from inputs");
    }

    // load template for bar type
    if (type == 'badge') {
        const template = require('./template-badge');
        svg = template(points, percentage, label, styleOptions);
    }
    else {
        const template = require('./template-default');
        svg = template(points, percentage, label, styleOptions);
    }
    return svg;
}

// write svg file
function writeSVGFile(filePath, svg) {

    // throw error if filePath not string
    if (typeof filePath !== 'string') {
        throw new TypeError("File path not a string");
    }

    const fileParts = path.parse(filePath);
    // console.log(fileParts);

    // warn if no ext on path
    if (!fileParts.ext) {
        console.log(`::warning::No ext in filename: ${filePath}`);
    }

    try {
        // check dir of path exists
        if ((fileParts.dir) && !fs.existsSync(fileParts.dir)){
            console.log(`Dir '${fileParts.dir}' not found. Creating it...`);
            fs.mkdirSync(fileParts.dir, { recursive: true });
        }
    } catch(error) {
        console.log(`Error creating directory '${fileParts.dir}'.`);
        error.message = `Error creating directory '${fileParts.dir}'.\n\n` + error.message;
        throw error;
    }

    // fs.writeFile(filepath, svg, function (err) {
    //     if (err) return console.log(err);
    //     console.log(`SVG bar > ${filepath}`);
    // });

    try {
        // write svg file
        fs.writeFileSync(filePath, svg);
        console.log(`Write file: SVG bar > ${filePath}`);

    } catch(error) {
        console.log(`Error writing SVG file '${filePath}'.`);
        error.message = `Error writing SVG file '${filePath}'.\n\n` + error.message;
        throw error;
    }
}

module.exports = { splitPoints, templateSVG, writeSVGFile }
