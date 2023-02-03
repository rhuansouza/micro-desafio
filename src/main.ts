import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common';
import momentTimezone from 'moment-timezone';

const logger = new Logger('Main');
const configService = new ConfigService()
async function bootstrap() {
  
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672/smartranking'],
      noAck: false,
      queue: 'desafios',
    },
  });

  /*
  Date.prototype.toJSON = function(): any {
    return momentTimezone(this)
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD HH:mm:ss.SSS")
  }
*/
  
  await app.listen();
}
bootstrap();
