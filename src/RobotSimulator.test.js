const assert = require('assert');

describe("RobotSimulator", function () {

  const RobotSimulator = require('./RobotSimulator');
  const tableWidth = 5;
  const tableHeight = 5;


  // Verify instantiation
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
    throw new Error("not implemented yet");
  });


  // Verify command syntax.
  it("should accept a syntactically correct PLACE command.", function () {
    throw new Error("not implemented yet");
  });

  it("should accept a syntactically correct MOVE command.", function () {
    throw new Error("not implemented yet");
  });

  it("should accept a syntactically correct RIGHT command.", function () {
    throw new Error("not implemented yet");
  });

  it("should accept a syntactically correct LEFT command.", function () {
    throw new Error("not implemented yet");
  });

  it("should accept a syntactically correct REPORT command.", function () {
    throw new Error("not implemented yet");
  });


  // Verify command semantics.
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
