import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './utils/exceptions-logger-filter/exceptions-logger-filter';
import { AccountModule } from './module/core/account/modules/account.module';
import { AccountController } from './module/core/account/modules/account.controller';
import { AccountService } from './module/core/account/modules/account.service';
import { AuthenticationService } from './module/core/authentication/modules/authentication.service';
import { AuthenticationController } from './module/core/authentication/modules/authentication.controller';
import { AuthenticationModule } from './module/core/authentication/modules/authentication.module';
import { CustomerController } from './module/client/customer/modules/customer.controller';
import { CustomerService } from './module/client/customer/modules/customer.service';
import { CustomerModule } from './module/client/customer/modules/customer.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mailerConfig } from './module/core/send_mail/mail_config/mailer.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailController } from './module/core/send_mail/modules/send_mail/send_mail.controller';
import { SendMailService } from './module/core/send_mail/modules/send_mail/send_mail.service';
import { SendMailModule } from './module/core/send_mail/modules/send_mail/send_mail.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './module/web/admin/module/admin.module';
import { WarehourseModule } from './module/web/warehourse/modules/warehourse.module';
import { WarehourseController } from './module/web/warehourse/modules/warehourse.controller';
import { WarehourseService } from './module/web/warehourse/modules/warehourse.service';
import { AddressBookModule } from './module/client/address_book/module/address_book.module';
import { AddressBookService } from './module/client/address_book/module/address_book.service';
import { AddressBookController } from './module/client/address_book/module/address_book.controller';
import { StaffModule } from './module/core/staff/staff.module';
import { ManagerModule } from './module/core/manager/manager.module';
import { StaffController } from './module/core/staff/staff.controller';
import { ProfileService } from './shared/service/profile.service';
import { StatusModule } from './module/core/status/service/status.module';
import { QrCodeModule } from './module/core/qr-code/qr-code.module';
import { QrCodeController } from './module/core/qr-code/qr-code.controller';
import { AdminController } from './module/web/admin/module/admin.controller';
import { AdminService } from './module/web/admin/module/admin.service';
import { StaffService } from './module/core/staff/staff.service';
import { StatusService } from './module/core/status/service/status.service';
import { AddressModule } from './module/core/address/address.module';
import { ShiftModule } from './module/web/shift/shift.module';
import { ShiftController } from './module/web/shift/shift.controller';

@Module({
    imports: [
        DatabaseModule,
        AccountModule,
        AuthenticationModule,
        CustomerModule,
        SendMailModule,
        MailerModule.forRoot(mailerConfig),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        SharedModule,
        AdminModule,
        WarehourseModule,
        AddressBookModule,
        StaffModule,
        ManagerModule,
        StatusModule,
        QrCodeModule,
        AdminModule,
        StaffModule,
        AddressModule,
        ShiftModule,
    ],
    controllers: [
        AppController,
        AccountController,
        AuthenticationController,
        CustomerController,
        SendMailController,
        WarehourseController,
        AddressBookController,
        StaffController,
        QrCodeController,
        AdminController,
        StaffController,
        ShiftController,
    ],
    providers: [
        AppService,
        AccountService,
        AuthenticationService,
        {
            provide: APP_FILTER,
            useClass: ExceptionsLoggerFilter,
        },
        CustomerService,
        ConfigService,
        SendMailService,
        WarehourseService,
        AddressBookService,
        ProfileService,
        AdminService,
        StatusService,
        StaffService,
    ],
})
export class AppModule {}
