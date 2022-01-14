import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MonthType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  days: number;
}
