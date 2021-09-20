const process = require('process');
const cp = require('child_process');
// const path = require('path');

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_POINTS'] = '12/34';
  process.env['INPUT_PATH'] = '.github/icons/pointsbar.svg';
  // const ip = path.join(__dirname, '..', 'src', 'index.js');
  const ip = 'src/index.js';
  console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
})
