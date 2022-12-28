import { CommandTestFactory } from "nest-commander-testing";
import { UnifyCommand } from "./unify";
import { TestingModule } from "@nestjs/testing";

const outputHelp = `Usage: program [options] [command]

Options:
  -h, --help                     display help for command

Commands:
  unify [options] <zipFiles...>  unify zip files into a directory with mapping
  help [command]                 display help for command
`;

const stdoutSpy = jest.spyOn(process.stdout, "write");
const stderrorSpy = jest.spyOn(process.stderr, "write");
const exitMock = jest.spyOn(process, "exit");
const consoleLogMock = jest.spyOn(console, "log");
const consoleWarnMock = jest.spyOn(console, "warn");
const consoleErrorMock = jest.spyOn(console, "error");

describe("unify.ts", () => {
  let commandInstance!: TestingModule;

  beforeEach(async () => {
    stdoutSpy.mockReset();
    stderrorSpy.mockReset();
    exitMock.mockReset();
    consoleLogMock.mockReset();
    consoleWarnMock.mockReset();
    consoleErrorMock.mockReset();
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
      imports: [UnifyCommand],
    }).compile();
  });

  afterAll(async () => {
    stdoutSpy.mockRestore();
    stderrorSpy.mockRestore();
    exitMock.mockRestore();
    consoleLogMock.mockRestore();
    consoleWarnMock.mockRestore();
    consoleErrorMock.mockRestore();
  });

  it("show help with error", async () => {
    await CommandTestFactory.run(commandInstance);
    expect(process.stderr.write).toBeCalled();
    expect(stderrorSpy.mock.calls[0][0]).toBe(outputHelp);
  });

  describe("run success", () => {
    it("correct default values", async () =>{
      const unifyCommandMock = jest.spyOn(UnifyCommand.prototype, 'run');
      await CommandTestFactory.run(commandInstance, ['unify', '-o', 'dist', 'test.zip']);
      expect(process.stdout.write).toBeCalled();
      expect(
        unifyCommandMock.mock.calls[0][0]
      ).toEqual(['test.zip']);
      expect(
        unifyCommandMock.mock.calls[0][1]
      ).toEqual({"archive": false, "force": false, "out": "dist"});
    })
  });
});
