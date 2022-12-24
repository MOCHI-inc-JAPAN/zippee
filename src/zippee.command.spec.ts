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


const stdoutSpy = jest.spyOn(process.stdout, "write")
const stderrorSpy = jest.spyOn(process.stderr, "write")
const exitMock = jest.spyOn(process, "exit")

describe("ZippeeCommand", () => {
  let commandInstance!: TestingModule;

  beforeEach(async () => {
    stdoutSpy.mockReset()
    stderrorSpy.mockReset()
    exitMock.mockReset()
    stdoutSpy.mockImplementation(() => {
      return true;
    });
    stderrorSpy.mockImplementation(() => {
      return true;
    });
    exitMock.mockImplementation(() => {
      return 0 as never;
    });
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [ZippeeCommand],
    }).compile();
  });

  afterAll(() => {
    stdoutSpy.mockRestore();
    stderrorSpy.mockRestore();
    exitMock.mockRestore()
  });

  it("show help with error", async () => {
    await CommandTestFactory.run(commandInstance);
    expect(process.stderr.write).toBeCalled();
    expect(stderrorSpy.mock.calls[0][0]).toBe(outputHelp);
  });

  it("show help with stdout", async () => {
    await CommandTestFactory.run(commandInstance, ["zippee"]);
    expect(process.stdout.write).toBeCalled();
    expect(
      (stdoutSpy.mock.calls[0][0] as string).includes(`simple zip utility`)
    ).toBeTruthy();
  });
});
