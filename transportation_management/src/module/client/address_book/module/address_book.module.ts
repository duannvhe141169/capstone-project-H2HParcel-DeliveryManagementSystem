import { Module } from '@nestjs/common';
import { AddressBookService } from './address_book.service';
import { AddressBookController } from './address_book.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/entities/address.entity';
import { CustomerEntity } from 'src/entities/customer.entity';
import { AddressBookEntity } from 'src/entities/address-book.entity';
import { InformationEntity } from 'src/entities/information.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AddressBookEntity,
            CustomerEntity,
            AddressEntity,
            InformationEntity,
            InformationEntity,
        ]),
        ConfigModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: process.env.EXPIRES_IN_TOKEN },
        }),
    ],
    providers: [AddressBookService],
    controllers: [AddressBookController],
    exports: [TypeOrmModule],
})
export class AddressBookModule {}
