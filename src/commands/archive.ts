import { Command, CommandRunner, Option } from "nest-commander";
import path from "path";
import fs from "fs";
import archiver from "archiver";

type ArchiveCommandOptions = {
  out: string;
  level: number;
  force: boolean;
};

@Command({
  name: "archive",
  description: `archive files into a zip`,
  arguments: "<dir>",
  argsDescription: {
    "<dir>": "files in a directory are unified into a zip",
  },
})
export class ArchiveCommand extends CommandRunner {
  constructor() {
    super();
  }

  private async load(
    dirpath: string,
    out: string,
    {
      level,
    }: {
      level: number;
    }
  ) {
    const output = fs.createWriteStream(out);
    const archivePipe = archiver("zip", {
      zlib: { level }, // Sets the compression level.
    });
    const outputStream = archivePipe.pipe(output);
    const awaiter = new Promise((success, reject) => {
      outputStream.on("finish", () => {
        console.log('finish')
        success('')
      });
      outputStream.on("error", (e) => {
        reject(e)
      });
    })
    await archivePipe.glob("**/*", { cwd: dirpath }).finalize();
    await awaiter
  }

  async run(args: string[], options?: ArchiveCommandOptions) {
    const [dir] = args;
    const { force, level = 9, out = path.resolve(process.cwd(), `${args[0]}.zip`) } =
      options || {};
    const dirpath = dir.startsWith("/")
      ? dir
      : path.resolve(process.cwd(), dir);
    if (!fs.statSync(dirpath).isDirectory()) {
      throw new Error("Please specify a directory.");
    }
    if(!force){
      if (!(out.endsWith(".zip") || out.endsWith(".epub"))) {
        throw new Error(`Please specify output file ends with ".zip" or ".epub". If you want to continue, run with -f or --force flag`);
      }
    }
    const outDir = path.dirname(out);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, {
        recursive: true,
      });
    }

    await this.load(dirpath, out, { level });
  }

  @Option({
    flags: "-o --out <out>",
    name: "out",
    description: "Output directory extartced to.",
    defaultValue: undefined,
  })
  parseOut(arg: string): string {
    return arg;
  }
  @Option({
    flags: "-l --level <level>",
    name: "level",
    description: "Archive level",
    defaultValue: 9,
  })
  parseLevel(arg: string): number {
    return parseInt(arg, 10);
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
