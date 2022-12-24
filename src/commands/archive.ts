import { SubCommand, CommandRunner } from "nest-commander";

@SubCommand({
  name: "zippee",
  subCommands: [],
  description: "simple zip utility",
})
export class ZippeeCommand extends CommandRunner {
  constructor() {
    super();
  }

  async run() {
    this.command.help();
  }
}
