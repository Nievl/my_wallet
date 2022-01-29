import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  dateStart: number;

  @Column({ nullable: true })
  dateEnd: number;

  @Column()
  position: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
