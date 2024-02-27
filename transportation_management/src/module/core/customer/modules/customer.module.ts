import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../entity/customer';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerEntity]),
        ConfigModule,
        JwtModule.register({
            global: true,
            secret: 'SECRET',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [CustomerService],
    controllers: [CustomerController],
    exports: [TypeOrmModule],
})
export class CustomerModule {}