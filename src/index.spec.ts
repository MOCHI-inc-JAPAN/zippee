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

describe("index", () => {
  let commandInstance!: TestingModule;

  beforeEach(async () => {
    stdoutSpy.mockReset();
    stderrorSpy.mockReset();
    exitMock.mockReset()
    consoleLogMock.mockReset()
    consoleWarnMock.mockReset()
    consoleErrorMock.mockReset()
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

    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [ZippeeCommand],
    }).compile();
  });

  afterAll(async () => {
    stdoutSpy.mockRestore();
    stderrorSpy.mockRestore();
    exitMock.mockRestore()
    consoleLogMock.mockRestore()
    consoleWarnMock.mockRestore()
    consoleErrorMock.mockRestore()
  });

  it("show help with error", async () => {
    await CommandTestFactory.run(commandInstance);
    // expect(process.stdout.write).toBeCalled()
    expect(stderrorSpy.mock.calls[0][0]).toBe(outputHelp);
  });

  it("show help with stdout", async () => {
    await CommandTestFactory.run(commandInstance, ["zippee"]);
    // expect(process.stdout.write).toBeCalled()
    expect(
      (stdoutSpy.mock.calls[0][0] as string).includes(`simple zip utility`)
    ).toBeTruthy();
  });
});
