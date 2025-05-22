import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async checkIfUserExists(email: string) {
    const [alreadyExists] = await this.findByEmail(email);
    if (alreadyExists) {
      throw new BadRequestException('User already exists');
    }
    return alreadyExists;
  }
  async create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    this.checkIfUserExists(email);
    const user = this.repo.create({ name, email, password });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id: id.toString() });
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const updatedUser = { ...user, ...attrs };
    return this.repo.save(updatedUser);
  }

  async activate(id: string) {
    const user = await this.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.isActive = true;
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.isActive) {
      user.isActive = false;
      this.repo.save(user);
      return {
        message: 'user removed',
      };
    }

    throw new BadRequestException('user is not active');
  }
}
