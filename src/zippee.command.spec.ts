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

const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation(() => {
  return true;
});
const stderrorSpy = jest
  .spyOn(process.stderr, "write")
  .mockImplementation(() => {
    return true;
  });
jest.spyOn(process, "exit").mockImplementation(() => {
  return 0 as never;
});

describe("ZippeeCommand", () => {
  let commandInstance!: TestingModule;

  beforeEach(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [ZippeeCommand],
    }).compile();
  });

  it("show help with error", async () => {
    await CommandTestFactory.run(commandInstance);
    expect(process.stderr.write).toBeCalled();
    expect(stderrorSpy.mock.calls[0][0]).toBe(outputHelp);
  });

  it("show help with stdout", async () => {
    await CommandTestFactory.run(commandInstance, ["zippee"]);
    expect(process.stderr.write).toBeCalled();
    expect(
      (stdoutSpy.mock.calls[0][0] as string).includes(`simple zip utility`)
    ).toBeTruthy();
  });
});
