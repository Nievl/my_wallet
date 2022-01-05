import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Category } from './Category';
import { Currency } from './Currency';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  amount: number;

  @Column()
  @OneToMany(() => Category, (category) => category.name)
  category: number;

  @Column()
  converted_amount: number;

  @Column()
  @OneToMany(() => Currency, (currency) => currency.name)
  currency: number;

  @Column({ nullable: false, type: 'date' })
  dateCreate: Date;

  @Column({ type: 'date', nullable: true })
  dateChange: Date | null;

  @Column({ unique: true })
  hash: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
