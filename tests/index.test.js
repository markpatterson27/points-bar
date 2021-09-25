const process = require('process');
const cp = require('child_process');
// const path = require('path');
const { fs, vol } = require('memfs');
const core = require('@actions/core');
const action = require('../src/index');

jest.mock('fs');

// action tests
// test outputs triggered
describe("action interaction", () => {
    beforeEach(() => {
        // jest.spyOn(core, "setOutput").mockImplementation();
        jest.spyOn(core, "setFailed").mockImplementation();
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});

        jest.spyOn(fs, 'mkdirSync');
        jest.spyOn(fs, 'writeFileSync');
        vol.reset();
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    // test no points throws setFailed
    test('no points throws error', () => {
        process.env['INPUT_POINTS'] = '';
        process.env['INPUT_PATH'] = 'dummy-path/pointsbar.svg';
        action.run();
        expect(core.setFailed).toHaveBeenCalled();
        expect(core.setFailed).toBeCalledWith('Input required and not supplied: points');
    });

    // test no path throws setFailed
    test('no points throws error', () => {
        process.env['INPUT_POINTS'] = '12/34';
        process.env['INPUT_PATH'] = '';
        action.run();
        expect(core.setFailed).toHaveBeenCalled();
        expect(core.setFailed).toBeCalledWith('Input required and not supplied: path');
    });

    // test invalid points sets error
    const testPoints = [
        // points input, expected error response
        ['12', 'Points input incorrectly formatted'],
        ['12 34', 'Points input incorrectly formatted'],
        ['12/34/56', 'Points input incorrectly formatted'],
        ['cat/34', 'Points part not a number'],
        ['12/dog', 'Points part not a number']
    ];
    test.each(testPoints)('invalid points throws error', (points, expected) => {
        process.env['INPUT_POINTS'] = points;
        process.env['INPUT_PATH'] = 'dummy-path/pointsbar.svg';
        action.run();
        expect(core.setFailed).toHaveBeenCalled();
        expect(core.setFailed).toBeCalledWith(expected);
    });

    // test invalid path sets error
    const testPaths = [
        // path input, expected error response
        ['dummy-path?*\0/pointsbar.svg', 'Error creating directory'],
        ['!pointsbar[a-z]*\0.svg', 'Error writing SVG file'],
    ];
    test.each(testPaths)('invalid path throws error', (inputPath, expected) => {
        process.env['INPUT_POINTS'] = '12/34';
        process.env['INPUT_PATH'] = inputPath;
        const expectedRE = new RegExp(expected, 'gi');
        action.run();
        expect(core.setFailed).toHaveBeenCalled();
        expect(core.setFailed).toBeCalledWith(expect.stringMatching(expectedRE));
    });

    // test valid required inputs create file
    test('valid required inputs create file', () => {
        const points = '12/34';
        const svgPath = 'dummy-path/pointsbar.svg'
        process.env['INPUT_POINTS'] = points;
        process.env['INPUT_PATH'] = svgPath;
        action.run();
        expect(core.setFailed).not.toHaveBeenCalled();
        expect(fs.writeFileSync).toHaveBeenCalled();
        expect(fs.existsSync(svgPath)).toBe(true);

        const svgFileContents = fs.readFileSync(svgPath, 'utf-8');
        expect(svgFileContents).toContain(`<svg`);      // file start
        expect(svgFileContents).toContain(`</svg>`);    // file end
        expect(svgFileContents).toContain(`<title>Points: ${points}</title>`);
        expect(svgFileContents).toContain(`<text x="0" y="12">Points</text>`);
    });

    // test valid inputs create file
    test('valid inputs create file', () => {
        const points = '12/34';
        const svgPath = 'dummy-path/pointsbar.svg'
        process.env['INPUT_POINTS'] = points;
        process.env['INPUT_PATH'] = svgPath;
        process.env['INPUT_TYPE'] = 'badge';
        process.env['INPUT_BAR-COLOR'] = '#123456';
        process.env['INPUT_BACKGROUND-COLOR'] = '#123456';
        process.env['INPUT_REVERSE'] = 'true';
        action.run();
        expect(core.setFailed).not.toHaveBeenCalled();
        expect(fs.writeFileSync).toHaveBeenCalled();
        expect(fs.existsSync(svgPath)).toBe(true);
    });
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_POINTS'] = '12/34';
  process.env['INPUT_PATH'] = '.github/icons/pointsbar.svg';
  // const ip = path.join(__dirname, '..', 'src', 'index.js');
  const ip = 'src/index.js';
  console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
})
