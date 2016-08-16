/** Main Robot Simulator class. */
class RobotSimulator {

  /**
   * Constructor takes table size as arguments.
   * @param {number} width - The table width.
   * @param {number} height - The table height.
   */
  constructor(width, height) {

    if (!width || typeof (width) !== 'number' || width < 1) throw new Error('Invalid width argument. Must be > 0.');
    if (!height || typeof (height) !== 'number' || height < 1) throw new Error('Invalid height argument. Must be > 0.');

    // Set initial state.
    this.state = {
      table: {
        width: width,
        height: height
      }
    };

  }


  /** Return current state. */
  getCurrentState() {
    return new Promise((resolve, reject) => {
      return resolve(this.state);
    });
  }


  /**
   * Parse a command.
   * @param {string} command - The command to parse.
   */
  parseCommand(command) {
    return new Promise((resolve, reject) => {

      // Use a simple regexp to either return null, or an array of matching segments.
      var result = /^(PLACE ([0-9]+) ([0-9]+) (NORTH|SOUTH|EAST|WEST)|MOVE|LEFT|RIGHT|REPORT)$/.exec(command);

      if (result) return resolve(result);
      return reject(new Error('Invalid command syntax'));
    });
  }

}

module.exports = RobotSimulator;
