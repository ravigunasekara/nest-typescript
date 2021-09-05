import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_DB_ACCESS } from './app.propertiese';

@Module({
  imports: [EmployeesModule, MongooseModule.forRoot(MONGO_DB_ACCESS)],
})
export class AppModule {}
