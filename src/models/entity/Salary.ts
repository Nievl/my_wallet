import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './Company';

@Entity()
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  net: number;

  @Column()
  hided: number;

  @Column()
  gross: number;

  @ManyToOne(() => Company, (company) => company.name)
  company: Company;

  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
