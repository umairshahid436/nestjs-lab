import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessageRepository } from "./message.repository";
import { MessageService } from "./messages.service";

@Module({
  controllers: [MessagesController],
  providers: [MessageService, MessageRepository],
})
export class MessagesModule {}
