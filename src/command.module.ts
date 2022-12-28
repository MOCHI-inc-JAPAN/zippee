import { Module } from "@nestjs/common";
import { UnifyCommand } from "./commands/unify";
import { ArchiveCommand } from "./commands/archive";

@Module({
  providers: [UnifyCommand, ArchiveCommand],
})
export class CommandModule {}
