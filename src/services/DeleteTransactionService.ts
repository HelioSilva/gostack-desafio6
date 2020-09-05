import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // TODO
    const repo = getRepository(Transaction);

    const item = await repo.findOne({
      where: {
        id,
      },
    });
    if (!item) {
      throw new AppError('Transaction not found!', 404);
    } else {
      await repo.remove(item);
    }
  }
}

export default DeleteTransactionService;
