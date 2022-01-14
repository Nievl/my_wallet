import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MonthType } from './MonthType';
import { Paycheck } from './Paycheck';

@Entity()
export class Month {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MonthType, (monthName) => monthName.id)
  monthName: MonthType;

  @ManyToOne(() => Paycheck, (paycheck) => paycheck.id)
  paycheck: Paycheck;

  @Column()
  days: number;

  @Column()
  workedDays: number;

  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
