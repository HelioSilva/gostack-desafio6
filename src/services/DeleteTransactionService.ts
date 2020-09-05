import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // TODO
    const repo = getRepository(Transaction);

    if (id) {
      const item = await repo.findOne({
        where: {
          id,
        },
      });
      if (!item) {
        new AppError('Transaction not found!', 404);
      } else {
        await repo.remove(item);
      }
    }
  }
}

export default DeleteTransactionService;
