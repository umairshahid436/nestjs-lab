import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  updatedAt: Date;
  @Column({ default: true })
  isActive: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
