import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaycheckType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  ruName: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
