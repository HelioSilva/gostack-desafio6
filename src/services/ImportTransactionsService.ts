import Transaction from '../models/Transaction';
import csvparse from 'csv-parse';
import fs from 'fs';
import CreateTransactionService from './CreateTransactionService';

interface createDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute(file: string): Promise<Transaction[]> {
    const stream = fs.createReadStream(file);

    const parse = csvparse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const transactionsCSV: createDTO[] = [];

    const parseCSV = stream.pipe(parse);

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) => {
        return cell.trim();
      });

      transactionsCSV.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    let responseService: Transaction[] = [];

    for (let index = 0; index < transactionsCSV.length; index++) {
      const element = transactionsCSV[index];
      const newTransaction = new CreateTransactionService();
      const resposta = await newTransaction.execute(element);
      responseService.push(resposta);
    }

    return responseService;
  }
}

export default ImportTransactionsService;
