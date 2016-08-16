Toy Robot Simulator
===================

Solution Overview
-----------------

- Take input from stdin.
- Validate command and sequence with regard to current state.
- Process command and validate constraints on future state, logging to stderr.
- Apply state.
- Produce output on stdout.

Clarification
-------------

The following is irrelevant. Previously stated was "The application should discard all commands in the sequence until
a valid PLACE command has been executed."

- A robot that is not on the table can choose the ignore the MOVE, LEFT, RIGHT
  and REPORT commands.
