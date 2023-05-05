import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/roles/enums/role.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  resetToken: string; // New column for reset token

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
