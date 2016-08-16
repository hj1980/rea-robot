const RobotSimulator = require('./src/RobotSimulator.js');

const robotSimulator = new RobotSimulator(5,5);



const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', (command) => {
  if (command !== null) {
		try {
			var result = robotSimulator.processCommand(command);
			if (typeof(result) === 'string')  process.stdout.write(result + '\n');
		} catch(e) {
			process.stderr.write(e.toString() + '\n');
		}
  }
});
