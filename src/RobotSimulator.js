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
      resolve(this.state);
    });
  }

}

module.exports = RobotSimulator;
