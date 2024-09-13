import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './module/books/books.module';
import { MemberModule } from './module/members/member.module';

@Module({
  imports: [BooksModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
