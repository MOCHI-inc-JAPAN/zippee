import { CommandTestFactory } from "nest-commander-testing";
import { ZippeeCommand } from "./zippee.command";
import { TestingModule } from "@nestjs/testing";

const outputHelp = `Usage: program [options] [command]

Options:
  -h, --help      display help for command

Commands:
  zippee          simple zip utility
  help [command]  display help for command
`;

// https://github.com/facebook/jest/issues/9984
jest.mock("child_process", () => {
  return {
    spawn() {
      return;
    },
  };
});

const stdoutSpy = jest.spyOn(process.stdout, "write");
const stderrorSpy = jest.spyOn(process.stderr, "write");
const exitMock = jest.spyOn(process, "exit");
const consoleLogMock = jest.spyOn(console, "log");
const consoleWarnMock = jest.spyOn(console, "warn");
const consoleErrorMock = jest.spyOn(console, "error");

stdoutSpy.mockImplementation(() => {
  return true;
});
stderrorSpy.mockImplementation(() => {
  return true;
});
consoleLogMock.mockImplementation(() => {
  return;
});
consoleWarnMock.mockImplementation(() => {
  return;
});
consoleErrorMock.mockImplementation(() => {
  return;
});
exitMock.mockImplementation((): never => {
  return 0 as never;
});

describe("index", () => {
  let commandInstance!: TestingModule;

  beforeEach(async () => {
    stdoutSpy.mockReset();
    stderrorSpy.mockReset();
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [ZippeeCommand],
    }).compile();
  });

  afterEach(async () => {
    stdoutSpy.mockRestore();
    stderrorSpy.mockRestore();
  });

  xit("show help with error", async () => {
    await CommandTestFactory.run(commandInstance);
    // expect(process.stdout.write).toBeCalled()
    expect(stderrorSpy.mock.calls[0][0]).toBe(outputHelp);
  });

  xit("show help with stdout", async () => {
    await CommandTestFactory.run(commandInstance, ["zippee"]);
    // expect(process.stdout.write).toBeCalled()
    expect(stdoutSpy.mock.calls[0][0]).toBe(outputHelp);
  });
});
