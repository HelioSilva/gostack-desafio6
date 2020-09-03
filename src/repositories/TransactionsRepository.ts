import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(lista: Transaction[]): Promise<Balance> {
    // TODO
    const newBalance = { income: 0, outcome: 0, total: 0 };
    var reponseReduce = lista.reduce(
      function (acumulador, valorAtual, indice, array) {
        valorAtual.type === 'income'
          ? (newBalance.income =
              Number(acumulador.income) + Number(valorAtual.value))
          : (newBalance.outcome =
              Number(acumulador.outcome) + Number(valorAtual.value));
        newBalance.total =
          Number(newBalance.income) - Number(newBalance.outcome);
        return newBalance;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return reponseReduce;
  }
}

export default TransactionsRepository;
