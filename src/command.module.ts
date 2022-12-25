import { Module } from "@nestjs/common";
import { UnifyCommand } from "./commands/unify";

@Module({
  providers: [UnifyCommand],
})
export class CommandModule {}
