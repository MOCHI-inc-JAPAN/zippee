import { Module } from "@nestjs/common";
import { UnifyCommand } from "./commands/unify";
import { ArchiveCommand } from "./commands/archive";
import { UnzipCommand } from "./commands/unzip";

@Module({
  providers: [UnifyCommand, ArchiveCommand, UnzipCommand],
})
export class CommandModule {}
