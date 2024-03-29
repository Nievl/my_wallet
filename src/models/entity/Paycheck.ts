import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './Company';
import { Month } from './Month';
import { PaycheckType } from './PaycheckType';
import { Salary } from './Salary';

@Entity()
export class Paycheck {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PaycheckType, (paycheckType) => paycheckType.name)
  type: PaycheckType;

  @ManyToOne(() => Company, (company) => company.name)
  company: Company;

  @ManyToOne(() => Salary, (salary) => salary.id)
  salary: Salary;

  @ManyToOne(() => Month, (month) => month.id)
  month: Month;

  @Column()
  amount: number;

  @Column()
  date: number;

  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
