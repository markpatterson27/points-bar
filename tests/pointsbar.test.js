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
