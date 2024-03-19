import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddressBookService } from './address_book.service';
import { createAddresBookDto } from '../dto/create_address_book_dto';
import { setDefaultAddressDto } from '../dto/set_default_address_dto';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserLogin } from 'src/decorators/user_login.decorator';
import { UserLoginData } from 'src/module/core/authentication/modules/user_login_data';
import { UpdateAddresBookDto } from '../dto/update_address_book_dto';

@Controller('address-book')
@ApiTags('address-book-api')
export class AddressBookController {
    constructor(private readonly addressBookService: AddressBookService) {}
    @Get('getAddressBookByCusId')
    @Roles(Role.CUSTOMER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiBearerAuth('JWT-auth')
    async getAddressBookByCusId(@UserLogin() userLogin: UserLoginData): Promise<any> {
        return this.addressBookService.getAddressBookByCusId(Number(userLogin.id));
    }
    @Post('CreateDefaultAddress')
    @Roles(Role.CUSTOMER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiBearerAuth('JWT-auth')
    async createAddressBook(@UserLogin() userLogin: UserLoginData, @Body() data: createAddresBookDto): Promise<any> {
        return this.addressBookService.createAddressBook(data, userLogin.id);
    }
    @Put('setDefaultAddress')
    @Roles(Role.CUSTOMER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiBearerAuth('JWT-auth')
    async setDefaultAddressBook(
        @Body() data: setDefaultAddressDto,
        @UserLogin() userLogin: UserLoginData,
    ): Promise<any> {
        return this.addressBookService.setDefaultAddressBook(Number(data.book_id), userLogin.id);
    }
    @Put('updateAddressBook')
    @Roles(Role.CUSTOMER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiBearerAuth('JWT-auth')
    async updateAddressbook(@Body() data: UpdateAddresBookDto, @UserLogin() userLogin: UserLoginData): Promise<any> {
        return this.addressBookService.updateAddressbook(data, userLogin.id);
    }
    @Put('softDeleteAddressBook')
    @Roles(Role.CUSTOMER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiBearerAuth('JWT-auth')
    async softDeleteAddressBook(
        @Body() data: setDefaultAddressDto,
        @UserLogin() userLogin: UserLoginData,
    ): Promise<any> {
        return this.addressBookService.softDelete(Number(data.book_id), userLogin.id);
    }
}