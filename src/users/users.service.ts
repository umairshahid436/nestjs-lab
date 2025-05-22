import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const user = this.repo.create({ name, email, password });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id: id.toString() });
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(parseInt(id));
    if (!user) {
      throw new Error('user not found');
    }
    const updatedUser = { ...user, ...attrs };
    return this.repo.save(updatedUser);
  }

  async activate(id: string) {
    const user = await this.findOne(parseInt(id));
    if (!user) {
      throw new Error('user not found');
    }
    user.isActive = true;
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(parseInt(id));
    if (!user) {
      throw new Error('user not found');
    }
    if (user.isActive) {
      user.isActive = false;
      this.repo.save(user);
      return { message: 'user deleted' };
    }
    throw new Error('user is not active');
  }
}
