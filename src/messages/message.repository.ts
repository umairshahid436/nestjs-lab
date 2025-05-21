import { Injectable } from "@nestjs/common";
import { writeFile, readFile } from "fs/promises";

@Injectable()
export class MessageRepository {
  async findOne(id: string) {
    const content = await readFile("messages.json", "utf-8");
    const messages = JSON.parse(content);
    return messages[id];
  }

  async findAll() {
    const content = await readFile("messages.json", "utf-8");
    const messages = JSON.parse(content);
    return messages;
  }

  async create(content: string) {
    const data = await readFile("messages.json", "utf-8");
    const messages = JSON.parse(data);
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };
    await writeFile("messages.json", JSON.stringify(messages));
  }
}
