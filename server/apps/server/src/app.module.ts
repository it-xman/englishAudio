import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// @ts-ignore
import {CommonModule} from "@app/common";
@Module({
  imports: [
      CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
