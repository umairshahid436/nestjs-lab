import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MessagesModule } from './messages/messages.module';

@Module({
  controllers: [AppController],
  imports: [MessagesModule],
})
export class AppModule {}
