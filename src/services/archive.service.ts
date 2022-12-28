import fs from "fs";
import archiver from "archiver";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ArchiveService  {
  async archive(
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
}
