import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, type: 'text'  })
  description: string | null;;
}
