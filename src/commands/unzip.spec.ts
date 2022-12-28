import { CommandTestFactory } from "nest-commander-testing";
import { UnzipCommand } from "./unzip";
import { TestingModule } from "@nestjs/testing";
import fs from 'fs';

describe("unzip.ts", () => {
  let commandInstance!: TestingModule;

  beforeEach(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [UnzipCommand],
    }).compile();
  });

  describe("run success", () => {
    it("correct default values", async () =>{
      const outpath = 'tmp/zip-a-content'
      await CommandTestFactory.run(
        commandInstance,
        ['unzip', '-o', outpath, 'fixtures/zip-a-content.zip']
      );
      expect(fs.existsSync(outpath)).toBeTruthy();
    })
  });
});
