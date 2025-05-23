import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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
}
