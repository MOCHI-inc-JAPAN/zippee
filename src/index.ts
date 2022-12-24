import { CommandFactory } from 'nest-commander';
import { CommandModule } from './command.module';

console.log('test')

async function bootstrap() {
  await CommandFactory.run(CommandModule, ['warn', 'error']);
}

bootstrap();
