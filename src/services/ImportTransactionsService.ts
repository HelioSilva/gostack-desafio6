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
      delimiter: ',',
      fromLine: 2,
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

    async function getTran(item: any) {
      const newTransaction = new CreateTransactionService();
      const resposta = await newTransaction.execute(item);
      responseService.push(resposta);
    }

    const x = transactionsCSV.map(getTran);
    await Promise.all(x);
    return responseService;
  }
}

export default ImportTransactionsService;
