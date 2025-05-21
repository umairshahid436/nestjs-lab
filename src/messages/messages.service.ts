import { Injectable } from "@nestjs/common";
import { MessageRepository } from "./message.repository";

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}
  async findOne(id: string) {
    return this.messageRepository.findOne(id);
  }

  async findAll() {
    return this.messageRepository.findAll();
  }

  async create(content: string) {
    this.messageRepository.create(content);
  }
}
