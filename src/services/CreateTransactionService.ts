import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

type tipos = 'income' | 'outcome';

interface createDTO {
  title: string;
  value: number;
  type: tipos;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: createDTO): Promise<Transaction> {
    // TODO
    if (String(type) !== 'income' && String(type) !== 'outcome') {
      throw new AppError('Type not defined', 400);
    }

    //get Repository
    const categoryORM = getRepository(Category);
    const transationORM = getRepository(Transaction);

    let category_id = '';

    const buscaCategoria = await categoryORM.find({
      where: { title: category },
    });

    if (buscaCategoria.length === 0) {
      const newCategory = await categoryORM.create({
        title: category,
      });
      await categoryORM.save(newCategory);
      category_id = newCategory.id;
    } else {
      category_id = buscaCategoria[0].id;
    }

    const transaction = transationORM.create({
      title,
      value,
      category_id,
      type,
    });

    try {
      await transationORM.save(transaction);
    } catch {
      new AppError('erro no cadastro', 400);
    }

    return transaction;
  }
}

export default CreateTransactionService;
