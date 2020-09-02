import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity('transaction')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column()
  value: number;

  @Column()
  category_id: string;

  @Column('time with time zone')
  created_at: Date;

  @Column('time with time zone')
  updated_at: Date;
}

export default Transaction;
