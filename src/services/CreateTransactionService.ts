import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

interface createDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const transationORM = getRepository(Transaction);
    const transaction = transationORM.create({
      title,
      value,
      category_id: '25',
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
