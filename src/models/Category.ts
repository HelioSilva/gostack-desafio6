import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  created_at: Date;

  @Column('time with time zone')
  updated_at: Date;
}

export default Category;
