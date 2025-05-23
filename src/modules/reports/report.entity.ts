import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  price: number;
  @Column()
  make: string;
  @Column()
  model: string;
  @Column()
  year: number;
  @Column({ nullable: true })
  lng: number;
  @Column({ nullable: true })
  lat: number;
  @Column()
  mileage: number;
  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  updatedAt: Date;
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
