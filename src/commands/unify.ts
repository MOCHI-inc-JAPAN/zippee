import {Command, CommandRunner, Option} from 'nest-commander'
import path from 'path'

type UnifyCommandOptions = {}

@Command({
  name: 'unify',
  description: `unify zip files into a directory with mapping`,
  arguments: '<zipFiles...>',
  argsDescription: {
    '<zipFiles...>': 'zip files are unified into a directory',
  }
})
export class UnifyCommand extends CommandRunner {
  constructor() {
    super()
  }

  async run (args: string[], options?:UnifyCommandOptions) {
    process.stdout.write(JSON.stringify(options, null, 2))
    process.stdout.write(JSON.stringify(args, null, 2))
  }

  @Option({
    flags: '-o --out <out>',
    name: 'out',
    description: 'Output directory extartced to.',
    defaultValue: path.resolve(process.cwd(),"out/")
  })
  parseOut(arg: string): string {
    return arg
  }

  @Option({
    flags: '-a --archive',
    name: 'archive',
    description: 'archive extracted files again.',
    defaultValue: false
  })
  parseArchive(): boolean {
    return true
  }

  @Option({
    flags: '-f --force',
    name: 'force',
    description: 'force all zip files unified with overwriting duplicated files followed by one.',
    defaultValue: false,
  })
  forceFlag(): boolean {
    return true
  }
}
