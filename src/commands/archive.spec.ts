import { CommandTestFactory } from "nest-commander-testing";
import { ArchiveCommand } from "./archive";
import { TestingModule } from "@nestjs/testing";
import fs from 'fs';

describe("archive.ts", () => {
  let commandInstance!: TestingModule;

  beforeEach(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [ArchiveCommand],
    }).compile();
  });

  describe("run success", () => {
    it("correct default values", async () =>{
      const outpath = 'tmp/zip-a-content.zip'
      await CommandTestFactory.run(
        commandInstance,
        ['archive', '-o', outpath, 'fixtures/zip-a-content']
      );
      expect(fs.existsSync(outpath)).toBeTruthy();
    })
  });
});
