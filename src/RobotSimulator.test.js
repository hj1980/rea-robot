const assert = require('assert');

describe("RobotSimulator", function () {

  const RobotSimulator = require('./RobotSimulator');
  const tableWidth = 5;
  const tableHeight = 5;


  describe("Verify instantiation:", function () {

    it("should not be able to be instantiated without a valid width and height", function () {
      [null, -1, 0].forEach((width) => {
        [null, -1, 0].forEach((height) => {
          assert.throws(() => {
            new RobotSimulator(width, height);
          });
        });
      });
    });

    it("should be able to be instantiated with a valid width and height", function () {
      new RobotSimulator(tableWidth, tableHeight);
    });

    it("should contain the correctly sized table surface in it's state.", function () {
      return new RobotSimulator(tableWidth, tableHeight).getCurrentState().then((state) => {
        assert.deepEqual(state, {
          table: {
            width: tableWidth,
            height: tableHeight
          }
        });
      });
    });

  });


  describe("Verify command syntax:", function () {

    it("should reject a bogus command.", function () {
      return new Promise((resolve, reject) => {
        new RobotSimulator(tableWidth, tableHeight).parseCommand('BOGUS').then(reject).catch(resolve);
      });
    });

    it("should accept a syntactically correct PLACE command.", function () {
      return new RobotSimulator(tableWidth, tableHeight).parseCommand('PLACE 0 0 NORTH');
    });

    it("should accept a syntactically correct MOVE command.", function () {
      return new RobotSimulator(tableWidth, tableHeight).parseCommand('MOVE');
    });

    it("should accept a syntactically correct RIGHT command.", function () {
      return new RobotSimulator(tableWidth, tableHeight).parseCommand('LEFT');
    });

    it("should accept a syntactically correct LEFT command.", function () {
      return new RobotSimulator(tableWidth, tableHeight).parseCommand('RIGHT');
    });

    it("should accept a syntactically correct REPORT command.", function () {
      return new RobotSimulator(tableWidth, tableHeight).parseCommand('REPORT');
    });

  });


  describe("Verify command semantics and logic:", function () {
    it("should allow placement of Robot on the table.", function () {
      throw new Error("not implemented yet");
    });

    it("should allow subsequent placement of Robot on the table.", function () {
      throw new Error("not implemented yet");
    });

    it("should ignore placement of Robot off the table.", function () {
      throw new Error("not implemented yet");
    });

    it("should ignore all commands until a valid PLACE command.", function () {
      throw new Error("not implemented yet");
    });

    it("should accept a valid MOVE command.", function () {
      throw new Error("not implemented yet");
    });

    it("should not change state for an invalid MOVE command.", function () {
      throw new Error("not implemented yet");
    });

    it("should accept a valid command after an invalid MOVE command.", function () {
      throw new Error("not implemented yet");
    });

    it("should silently ignore invalid commands.", function () {
      throw new Error("not implemented yet");
    });

  });

});
