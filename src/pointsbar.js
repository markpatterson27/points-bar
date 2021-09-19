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

module.exports = { splitPoints }
