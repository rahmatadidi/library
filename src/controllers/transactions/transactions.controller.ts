import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from 'src/services/transactions/transaction.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('borrow')
  borrowBook(@Body() body: { memberCode: string; bookCode: string }) {
    return this.transactionsService.borrowBook(body.memberCode, body.bookCode);
  }

  @Post('return')
  returnBook(
    @Body() body: { memberCode: string; bookCode: string; daysLate: number },
  ) {
    return this.transactionsService.returnBook(
      body.memberCode,
      body.bookCode,
      body.daysLate,
    );
  }
}
