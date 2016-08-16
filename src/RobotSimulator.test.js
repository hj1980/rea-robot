const assert = require('assert');

describe("RobotSimulator", function () {

  const RobotSimulator = require('./RobotSimulator');

  // Set the width and height for use throughout testing.
  const tableWidth = 5;
  const tableHeight = 5;

  describe("Verify instantiation:", function () {



    it("should not be able to be instantiated without a valid width and height", function () {

      // Loop through the 9 combinations of width and height.
      [null, -1, 0].forEach((width) => {
        [null, -1, 0].forEach((height) => {

          // Make sure the constructor throws an exception for each one.
          assert.throws(() => {
            new RobotSimulator(width, height);
          });

        });
      });
    });



    it("should be able to be instantiated with a valid width and height", function () {

      // Just make sure it doesn't throw during construction.
      new RobotSimulator(tableWidth, tableHeight);

    });



    it("should contain the correctly sized table surface in it's state.", function () {

      const state = new RobotSimulator(tableWidth, tableHeight).getCurrentState();

      // Make sure it's the same what we passed to the constructor.
      assert.deepEqual(state.table, {
        width: tableWidth,
        height: tableHeight
      });

    });



  });

  describe("Verify command syntax:", function () {



    it("should reject a bogus command.", function () {

      // We expect it to throw an exception for an invalid command.
      assert.throws(() => {
        new RobotSimulator(tableWidth, tableHeight).parseCommand('BOGUS');
      });

    });



    it("should accept a syntactically correct PLACE command.", function () {

      // Just make sure it doesn't throw during execution.
      new RobotSimulator(tableWidth, tableHeight).parseCommand('PLACE 0,0,NORTH');

    });



    it("should accept a syntactically correct MOVE command.", function () {

      // Just make sure it doesn't throw during execution.
      new RobotSimulator(tableWidth, tableHeight).parseCommand('MOVE');

    });



    it("should accept a syntactically correct RIGHT command.", function () {

      // Just make sure it doesn't throw during execution.
      new RobotSimulator(tableWidth, tableHeight).parseCommand('LEFT');

    });



    it("should accept a syntactically correct LEFT command.", function () {

      // Just make sure it doesn't throw during execution.
      new RobotSimulator(tableWidth, tableHeight).parseCommand('RIGHT');

    });



    it("should accept a syntactically correct REPORT command.", function () {

      // Just make sure it doesn't throw during execution.
      new RobotSimulator(tableWidth, tableHeight).parseCommand('REPORT');

    });



  });

  describe("Verify state generation:", function () {



    it("should correctly reflect state after PLACEment off the table.", function () {

      // Process the command with a new instance of RobotSimulator.
      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE ' + tableWidth + ',' + tableHeight + ',NORTH');

      // Check to see that the state is generated correctly.
      const state = robotSimulator.getCurrentState();
      assert.deepEqual(state.robot, undefined);

    });



    it("should correctly reflect state after PLACEment on the table.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE ' + tableWidth + ',' + tableHeight + ',NORTH');
      robotSimulator.processCommand('PLACE 0,0,NORTH');

      // Check to see that the state is generated correctly.
      const state = robotSimulator.getCurrentState();
      assert.deepEqual(state.robot, {
        x: 0,
        y: 0,
        f: 'NORTH'
      });

    });



    it("should correctly reflect state after MOVE command.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 0,0,NORTH');
      robotSimulator.processCommand('MOVE');

      // Check to see that the state is generated correctly.
      const state = robotSimulator.getCurrentState();
      assert.deepEqual(state.robot, {
        x: 0,
        y: 1,
        f: 'NORTH'
      });

    });



    it("should correctly reflect state after rePLACEment on the table.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 0,0,NORTH');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('PLACE 0,0,NORTH');

      // Check to see that the state is generated correctly.
      const state = robotSimulator.getCurrentState();
      assert.deepEqual(state.robot, {
        x: 0,
        y: 0,
        f: 'NORTH'
      });

    });



    it("should correctly reflect state after LEFT command.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 0,0,NORTH');

      // Counter-clockwise starting at NORTH (ie. Turning Left).
      const directions = ['NORTH', 'WEST', 'SOUTH', 'EAST'];

      // Do a left-wheelie...
      directions.forEach((f, idx) => {
        robotSimulator.processCommand('LEFT');
        assert.deepEqual(robotSimulator.getCurrentState().robot, {
          x: 0,
          y: 0,
          f: directions[(idx + 1) % directions.length]
        });
      })

    });



    it("should correctly reflect state after RIGHT command.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 0,0,NORTH');

      // Clockwise starting at NORTH (ie. Turning Right).
      const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

      // Do a right-wheelie...
      directions.forEach((f, idx) => {
        robotSimulator.processCommand('RIGHT');
        assert.deepEqual(robotSimulator.getCurrentState().robot, {
          x: 0,
          y: 0,
          f: directions[(idx + 1) % directions.length]
        });
      })

    });



    it("should ignore everything until PLACEd on the table.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('LEFT');
      robotSimulator.processCommand('RIGHT');
      robotSimulator.processCommand('REPORT');
      robotSimulator.processCommand('PLACE ' + tableWidth + ',' + tableHeight + ',NORTH');

      // Check to see that the state is generated correctly.
      const state = robotSimulator.getCurrentState();
      assert.deepEqual(state.robot, undefined);

    });



    it("should not fall to it's death.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 0,0,NORTH');

      for (let x = 0; x < tableWidth * 2; x++) {
        robotSimulator.processCommand('MOVE');
      }

      robotSimulator.processCommand('RIGHT');

      for (let y = 0; y < tableHeight * 2; y++) {
        robotSimulator.processCommand('MOVE');
      }

      // Check to see that the state is generated correctly.
      const state = robotSimulator.getCurrentState();
      assert.deepEqual(state.robot, {
        x: 4,
        y: 4,
        f: 'EAST'
      });

    });



    it("should REPORT it's ok.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 0,0,NORTH');

      assert.deepEqual(robotSimulator.processCommand('REPORT'), '0,0,NORTH');

    });



  });

  describe("Go on an adventure:", function () {



    it("One small step.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 0,0,NORTH');
      robotSimulator.processCommand('MOVE');

      assert.deepEqual(robotSimulator.processCommand('REPORT'), '0,1,NORTH');

    });



    it("Over to the left.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 0,0,NORTH');
      robotSimulator.processCommand('LEFT');

      assert.deepEqual(robotSimulator.processCommand('REPORT'), '0,0,WEST');

    });



    it("Across the hall.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 1,2,EAST');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('LEFT');
      robotSimulator.processCommand('MOVE');

      assert.deepEqual(robotSimulator.processCommand('REPORT'), '3,3,NORTH');

    });



    it("Down the street.", function () {

      const robotSimulator = new RobotSimulator(tableWidth, tableHeight);

      robotSimulator.processCommand('PLACE 3,1,WEST');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('LEFT');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('LEFT');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('RIGHT');
      robotSimulator.processCommand('RIGHT');
      robotSimulator.processCommand('RIGHT');
      robotSimulator.processCommand('LEFT');
      robotSimulator.processCommand('RIGHT');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');

      assert.deepEqual(robotSimulator.processCommand('REPORT'), '4,2,NORTH');


      // subsequent PLACE
      robotSimulator.processCommand('PLACE 4,4,EAST');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('LEFT');
      robotSimulator.processCommand('LEFT');
      robotSimulator.processCommand('LEFT');
      robotSimulator.processCommand('MOVE');
      robotSimulator.processCommand('RIGHT');

      assert.deepEqual(robotSimulator.processCommand('REPORT'), '4,3,WEST');
    });



  });

});
