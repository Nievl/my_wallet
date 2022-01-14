import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';
import { Currency } from './Currency';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Category, (category) => category.name)
  category: Category;

  @Column()
  converted_amount: number;

  @ManyToOne(() => Currency, (currency) => currency.name)
  currency: Currency;

  @Column({ nullable: false, type: 'date' })
  dateCreate: Date;

  @Column({ type: 'date', nullable: true })
  dateChange: Date | null;

  @Column({ unique: true })
  hash: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
