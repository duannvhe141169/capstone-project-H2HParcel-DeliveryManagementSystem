import { Module } from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { ShipperController } from './shipper.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationEntity } from 'src/entities/information.entity';
import { AccountEntity } from 'src/entities/account.entity';
import { AddressBookEntity } from 'src/entities/address-book.entity';
import { AddressEntity } from 'src/entities/address.entity';
import { CustomerEntity } from 'src/entities/customer.entity';
import { PackageTypeEntity } from 'src/entities/package-type.entity';
import { PriceMultiplierEntity } from 'src/entities/price-mutiplier.entity';
import { QRCodeEntity } from 'src/entities/qrcode.entity';
import { RequestRecordEntity } from 'src/entities/request-record.entity';
import { RequestStatusEntity } from 'src/entities/request-status.entity';
import { RequestTypeEntity } from 'src/entities/request-type.entity';
import { RequestEntity } from 'src/entities/request.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { StaffEntity } from 'src/entities/staff.entity';
import { WardEntity } from 'src/entities/ward.entity';
import { WarehouseRuleEntity } from 'src/entities/warehouse-rule.entity';
import { WarehouseEntity } from 'src/entities/warehouse.entity';
import { GoogleDriveConfig, GoogleDriveModule } from 'nestjs-googledrive-upload';
import * as googleDriverConfig from '../../../../google-driver-key.json';
import { OrderEntity } from 'src/entities/order.entity';
import { ConfigModule } from '@nestjs/config';
import { ActivityLogEntity } from 'src/entities/activity-log.entity';
import { TransitEntity } from 'src/entities/transit.entity';
import { PayRuleEntity } from 'src/entities/pay-rule.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity,
            AddressBookEntity,
            ActivityLogEntity,
            StaffEntity,
            WarehouseRuleEntity,
            CustomerEntity,
            PriceMultiplierEntity,
            TransitEntity,
            AddressEntity,
            WarehouseEntity,
            WardEntity,
            PriceMultiplierEntity,
            PackageTypeEntity,
            PayRuleEntity,
            OrderEntity,
            RoleEntity,
            QRCodeEntity,
            InformationEntity,
            RequestStatusEntity,
            RequestTypeEntity,
            RequestEntity,
            RequestRecordEntity,
        ]),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: process.env.EXPIRES_IN_TOKEN },
        }),
        GoogleDriveModule.register(googleDriverConfig as GoogleDriveConfig, '15oucDyYYlux4mVvm0B6DwypS7bPI_Fi_'),
        ConfigModule,
    ],
    controllers: [ShipperController],
    providers: [ShipperService],
    exports: [TypeOrmModule],
})
export class ShipperModule {}
