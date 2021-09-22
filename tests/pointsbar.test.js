const { splitPoints, templateSVG, writeSVGFile } =  require('../src/pointsbar');
const fs = require('fs');

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

    // test type returns non default template
    test("type returns correct template", () => {
        const currentPoints = "10";
        const maxPoints = "100";
        const type = "badge";

        const typeSVG = templateSVG(currentPoints, maxPoints, type);
        const defaultSVG = templateSVG(currentPoints, maxPoints);

        expect(typeSVG).toContain(`<svg`);
        expect(typeSVG).toContain(`</svg>`);
        expect(typeSVG).toEqual(expect.not.stringMatching(defaultSVG));
    });

    // test style options used in SVG
    const testTypes = [
        ['default'],
        ['badge']
    ];
    test.each(testTypes)("style options used in SVG", (type) => {
        const currentPoints = "10";
        const maxPoints = "100";
        const style = {
            fontFamily: 'Times New Roman',
            fontColor: '#ABCDEF',
            barBackground: '#123456',
            barColor: '#987654',
            width: 100,
            reverse: true,
        };

        const svg = templateSVG(currentPoints, maxPoints, type, style);

        expect(svg).toContain(`<svg`);
        expect(svg).toContain(`</svg>`);
        expect(svg).toContain(`font-family="${style.fontFamily}"`);
        expect(svg).toContain(`fill="${style.fontColor}"`);
        expect(svg).toContain(`fill="${style.barBackground}"`);
        expect(svg).toContain(`fill="${style.barColor}"`);
        expect(svg).toContain(`width="${style.width}px"`);
        expect(svg).not.toContain(`transform=""`);
    });
});

// test writeSVGFile
describe("writeSVGFile function", () => {
    beforeEach(() => {
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120px" height="36px"></svg>`

    // test throws error if file path not string
    test("throws not string", () => {
        const input = 5;
        // expect(parseMatter(5)).toThrow('content not a string');
        expect(() => {writeSVGFile(input, svg);}).toThrow(TypeError);
        expect(() => {writeSVGFile(input, svg);}).toThrow("File path not a string");
    });

    // test warning given if no ext in filename
    test("warning given if no ext", () => {
        const filePath = 'dummy-path/filename';
        jest.spyOn(console, 'log').mockImplementation(() => {});
        // mock fs so file not written
        jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
        jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

        writeSVGFile(filePath, svg);

        expect(console.log).toHaveBeenCalledWith(`::warning::No ext in filename: ${filePath}`);

    });

    // test if dir not exist, create
    test("dir created", () => {
        // mock fs so file not written
        jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
        jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

        const filePath = 'dummy-path/file.svg';

        // set up existsSync to meet the `if` condition
        // fs.existsSync.mockReturnValue(false);

        // call writeSVGFile with dummy path
        writeSVGFile(filePath, svg);

        // make assertion
        expect(fs.mkdirSync).toHaveBeenCalled();
    });

    // path invalid tests
    // only run on windows as *nix is very permissive with characters allowed
    if (process.platform == "win32") {
        // test invalid dir throws error
        test("invalid dir throws error", () => {
            // set up existsSync to meet the `if` condition
            // fs.existsSync.mockReturnValue(false);
            jest.spyOn(fs, 'existsSync').mockImplementation(() => {return false;});

            const filePath = 'parent-dir(aaa|bbb)/?dir[a-z]/file.svg';

            // Note: need real attempt to write dir to throw error
            expect(() => {writeSVGFile(filePath, svg);}).toThrow('ENOENT');
        });

        // test throws error if invalid filename in path
        test("invalid filename throws error", () => {
            const filePath = '[a-z]file?.svg';

            // Note: need real attempt to write dir to throw error
            expect(() => {writeSVGFile(filePath, svg);}).toThrow('ENOENT');
        });
    }

    // test file written
    test("file written", () => {
        // mock fs so file not written
        jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
        jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

        const filePath = 'dummy-path/file.svg';

        // call writeSVGFile with dummy path
        // writeSVGFile(filePath, svg);

        expect(() => {writeSVGFile(filePath, svg);}).not.toThrow(Error);
        expect(fs.writeFileSync).toHaveBeenCalled();
    });
});
