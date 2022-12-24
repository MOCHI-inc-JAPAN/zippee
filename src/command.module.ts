import { Module } from "@nestjs/common";
import { ZippeeCommand } from "./zippee.command";

@Module({
  providers: [ZippeeCommand],
})
export class CommandModule {}
