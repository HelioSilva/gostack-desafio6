import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Unique('da', ['title'])
  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Category;
