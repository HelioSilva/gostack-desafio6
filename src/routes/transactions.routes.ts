import { Router, Request, Response } from 'express';

import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import AppError from '../errors/AppError';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  // TODO
  const transactionORM = getRepository(Transaction);
  const responseAllTransactions = await transactionORM.find();

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
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
