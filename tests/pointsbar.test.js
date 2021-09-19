const { splitPoints } =  require('../src/pointsbar');

// test splitPoints
describe("splitPoints function", () => {
    // test throws error if input not string
    test('throws not string', () => {
        const input = 5;
        expect(() => {splitPoints(input);}).toThrow(TypeError);
        expect(() => {splitPoints(input);}).toThrow("Points input not a string");
    });

    // test incorrectly formatted or parts length input throws format error
    const testIncorrectFormat = ["5,5", "1/2/3", "12"];
    for (let input of testIncorrectFormat) {
        test(`${input} throws not correct format`, () => {
            expect(() => {splitPoints(input);}).toThrow(Error);
            expect(() => {splitPoints(input);}).toThrow("Points input incorrectly formatted");
        });
    }

    // test not numbers input throws not number error
    const testNotNumber = ["tree/10", "one/10", "1/cat"];
    for (let input of testNotNumber) {
        test(`${input} throws not number`, () => {
            expect(() => {splitPoints(input);}).toThrow(TypeError);
            expect(() => {splitPoints(input);}).toThrow("Points part not a number");
        });
    }

    // test input returns list
    const testParts = [
        ["1/2", ["1","2"]],
        ["5/10", ["5","10"]],
        ["123/1000", ["123","1000"]]
    ];
    // for (let i=0; i < 10; i++) {}
    test.each(testParts)("inputs return split parts", (input, parts) => {
        // console.log(input);
        // let result = splitPoints(input);
        expect(splitPoints(input)).toEqual(parts);
    });
});

// test templateSVG
describe("templateSVG function", () => {
    // test throws error if percentage not a number
    test("not numbers throws error", () => {
        const currentPoints = "15.4";
        const maxPoints = "tree";

        expect(() => {templateSVG(currentPoints, maxPoints);}).toThrow(TypeError);
        expect(() => {templateSVG(currentPoints, maxPoints);}).toThrow("Can not calculate percentage from inputs");
    });

    // test points in SVG
    // test percentage in SVG
    test("points and percentage in SVG", () => {
        for (let i = 0; i < 50; i++) {
            const currentPoints = i.toString();
            const maxPoints = "50";

            const percentage = Math.min(Math.floor((currentPoints / maxPoints) * 100), 100);
            const svg = templateSVG(currentPoints, maxPoints);

            // expect(svg).toMatch(/(10\/50)/);
            expect(svg).toContain(`>${currentPoints}/${maxPoints}<`);
            expect(svg).toContain(`to="${percentage}%"`);
        }
    });

    // // test percentage in SVG
    // test("percentage in SVG", () => {
    //     const currentPoints = "10";
    //     const maxPoints = "50";

    //     const percentage = Math.min(Math.floor((currentPoints / maxPoints) * 100), 100);
    //     const svg = templateSVG(currentPoints, maxPoints);

    //     expect(svg).toContain(`to="${percentage}%"`);
    // });

    // test percentage limited to 100
    test("percentage in SVG limited to 100", () => {
        for (let i = 0; i < 100; i+=10) {
            const currentPoints = "100";
            const maxPoints = i.toString();

            const svg = templateSVG(currentPoints, maxPoints);

            expect(svg).toContain(`to="100%"`);
        }
    });

});
