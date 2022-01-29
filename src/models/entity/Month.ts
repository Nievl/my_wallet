import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MonthType } from './MonthType';

@Entity()
export class Month {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MonthType, (monthName) => monthName.id)
  monthName: MonthType;

  @Column()
  days: number;

  @Column()
  workedDays: number;

  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
