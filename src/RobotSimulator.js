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

    // Return initial state.
    this.state = {
      table: {
        width: width,
        height: height
      }
    };

  }



  /** Return current state. */
  getCurrentState() {
    return (this.state);
  }



  /**
   * Parse a command.
   * @param {string} command - The command to parse.
   */
  parseCommand(command) {

    // Use a simple regexp to either return null, or an array of matching segments.
    var result = /^(PLACE ([0-9]+),([0-9]+),(NORTH|SOUTH|EAST|WEST)|MOVE|LEFT|RIGHT|REPORT)$/.exec(command);

    if (!result) throw new Error('Invalid command syntax');
    return result;

  }



  /**
   * Generate new state from parsed command and apply it internally.
   * @param {string} parsedCommand - The parsed command from which to generate and apply the new state.
   */
  generateAndApplyNewState(parsedCommand) {

    // First, get the current state.
    const state = this.getCurrentState();

    switch (parsedCommand[0].split(' ')[0]) {

    case 'PLACE':
      const x = Number.parseInt(parsedCommand[2]);
      const y = Number.parseInt(parsedCommand[3]);

      if (x < state.table.width && y < state.table.height) {

        // Completely replace the state object.
        this.state = Object.assign({}, state, {
          robot: {
            x: x,
            y: y,
            f: parsedCommand[4]
          }
        });

      }

      break;

    case 'MOVE':
      // Ignore command if Robot is not on the table.
      if (!state.robot) break;

      switch (this.state.robot.f) {

      case 'NORTH':
        if (this.state.robot.y < (state.table.height + 1)) {
          this.state = Object.assign({}, state, {
            robot: {
              x: this.state.robot.x,
              y: this.state.robot.y + 1,
              f: this.state.robot.f
            }
          });
        }
        break;

      case 'SOUTH':
        if (this.state.robot.y > 0) {
          this.state = Object.assign({}, state, {
            robot: {
              x: this.state.robot.x,
              y: this.state.robot.y - 1,
              f: this.state.robot.f
            }
          });
        }
        break;

      case 'EAST':
        if (this.state.robot.x < (state.table.width + 1)) {
          this.state = Object.assign({}, state, {
            robot: {
              x: this.state.robot.x + 1,
              y: this.state.robot.y,
              f: this.state.robot.f
            }
          });
        }
        break;

      case 'WEST':
        if (this.state.robot.x > 0) {
          this.state = Object.assign({}, state, {
            robot: {
              x: this.state.robot.x - 1,
              y: this.state.robot.y,
              f: this.state.robot.f
            }
          });
        }
        break;

      }

      break;

    case 'LEFT':
      // Ignore command if Robot is not on the table.
      if (!state.robot) break;
      break;

    case 'RIGHT':
      // Ignore command if Robot is not on the table.
      if (!state.robot) break;
      break;

    case 'REPORT':
      // Ignore command if Robot is not on the table.
      if (!state.robot) break;
      break;

    }

    return this.getCurrentState();

  }



  /**
   * Process a command.
   * @param {string} command - The command to process.
   */
  processCommand(command) {

    // Parse command, generate and apply new state.
    return this.generateAndApplyNewState(this.parseCommand(command));

  }

}

module.exports = RobotSimulator;
