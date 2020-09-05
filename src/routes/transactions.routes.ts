import { Router, Request, Response } from 'express';

import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import AppError from '../errors/AppError';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import multer from 'multer';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  // TODO
  const transactionORM = getRepository(Transaction);
  const responseAllTransactions = await transactionORM.find({ cache: false });

  const balance = new TransactionsRepository();
  const respostaBalance = await balance.getBalance(responseAllTransactions);

  response.status(200).json({
    transactions: responseAllTransactions,
    balance: respostaBalance,
  });
});

transactionsRouter.post('/', async (request: Request, response: Response) => {
  // TODO
  const { title, value, type, category } = request.body;

  const repo = new TransactionsRepository();
  const allTransaction = await getRepository(Transaction).find();

  if (
    type === 'outcome' &&
    (await repo.getBalance(allTransaction)).total < value
  ) {
    throw new AppError('Limite excedido!', 400);
  }

  const createTransaction = new CreateTransactionService();
  const resposta = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  response.status(200).json(resposta);
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
  const deleteRopository = new DeleteTransactionService();
  const valueID = request.params.id;

  await deleteRopository.execute(valueID);
  response.status(200).json({ resposta: 'OK' });
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    // TODO
    const importService = new ImportTransactionsService();

    const transactions = await importService.execute(request.file.path);
    return response.json(transactions);
  },
);

export default transactionsRouter;
