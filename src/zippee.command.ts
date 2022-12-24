import {Command, CommandRunner} from 'nest-commander'

@Command({
  name: 'zippee',
  subCommands: [],
  description: 'simple zip utility',
})
export class ZippeeCommand extends CommandRunner {
  constructor() {
    super()
  }

  async run () {
    this.command.help()
  }
}
