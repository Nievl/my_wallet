import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './Company';
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

  @Column()
  amount: number;

  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
