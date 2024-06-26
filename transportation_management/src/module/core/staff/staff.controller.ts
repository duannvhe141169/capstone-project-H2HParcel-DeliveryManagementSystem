import { Body, Controller, Get, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from '../../response/Response';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StaffProfileUpdateDto } from '../../../shared/dto/profile/staff_profile.update.dto';
import { Roles } from '../../../decorators/role.decorator';
import { Role } from '../../../enum/roles.enum';
import { AuthGuard } from '../../../guards/auth.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { ProfileService } from '../../../shared/service/profile.service';
import { UserLogin } from '../../../decorators/user_login.decorator';
import { UserLoginData } from '../authentication/dto/user_login_data';
import { StaffService } from './staff.service';
import { OrderStatusUpdateDto } from './dto/order-status.update.dto';
import { OrderViewService } from '../../../shared/service/order-view.service';
@ApiTags('staff')
@Controller('staff')
export class StaffController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly staffService: StaffService,
        private readonly orderService: OrderViewService,
    ) {}

    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'Get staff profile' })
    @ApiOperation({ summary: 'Get staff profile' })
    @Roles(Role.STAFF, Role.ADMIN, Role.SHIPPER, Role.MANAGER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiUnauthorizedResponse()
    @Get('profile')
    async getProfile(@UserLogin() userLogin: UserLoginData): Promise<Response> {
        const profile = await this.profileService.findOneStaffByAccId(userLogin.accId);

        return new Response(200, 'success', profile, null, 1);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'Update staff profile' })
    @ApiOperation({ summary: 'Update staff profile' })
    @Roles(Role.STAFF, Role.ADMIN, Role.SHIPPER, Role.MANAGER)
    @UseGuards(AuthGuard, RoleGuard)
    @UsePipes(ValidationPipe)
    @ApiUnauthorizedResponse()
    @ApiBody({ type: StaffProfileUpdateDto })
    @Post('profile/update')
    async updateProfile(
        @Body() request: StaffProfileUpdateDto,
        @UserLogin() userLogin: UserLoginData,
    ): Promise<Response> {
        const result = await this.profileService.updateStaffProfile(request, userLogin.accId);

        if (result) {
            return new Response(201, 'success', result, null, 1);
        }

        return new Response(200, 'false', null, null, 1);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'Update order status' })
    @Roles(Role.STAFF)
    @UseGuards(AuthGuard, RoleGuard)
    @UsePipes(ValidationPipe)
    @ApiUnauthorizedResponse()
    @ApiBody({ type: OrderStatusUpdateDto })
    @Post('order/status/update')
    async updateOrderStatus(@Body() request: OrderStatusUpdateDto): Promise<Response> {
        const result = await this.staffService.updateOrderStatus(request);
        if (result) {
            return new Response(201, 'success', result, null, 1);
        }

        return new Response(200, 'false', false, null, 1);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'View all order by warehouse of staff' })
    @ApiOperation({ summary: 'View all order by warehouse of staff' })
    @Roles(Role.STAFF, Role.ADMIN, Role.MANAGER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiUnauthorizedResponse()
    @Get('order/all')
    async findAllByWarehouse(
        @UserLogin() userLogin: UserLoginData,
        @Query('pageNo', ParseIntPipe) pageNo: number,
    ): Promise<Response> {
        const result = await this.orderService.findAllByStaff(pageNo, userLogin);

        return new Response(200, 'true', result.orders, result.paging, 1);
    }
    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'View all order  by warehouse of staff and filter by Status' })
    @ApiOperation({ summary: 'View all order for mobile by warehouse of staff filter' })
    @Roles(Role.STAFF, Role.ADMIN, Role.MANAGER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiUnauthorizedResponse()
    @ApiQuery({ name: 'orderStatus', required: false, type: Number })
    @Get('order/mobild/staff/all-filters/status')
    async findAllByWarehouseFiltersByStatusFormmobile(
        @UserLogin() userLogin: UserLoginData,
        @Query('orderStatus') orderStatus: number,
    ) {
        if (!orderStatus && orderStatus !== 0) {
            orderStatus = 0;
        }
        return await this.orderService.findAllByWarehouseFiltersByStatusFormmobile(userLogin, orderStatus);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'View all order by warehouse of staff and filter by Status' })
    @ApiOperation({ summary: 'View all order by warehouse of staff filter' })
    @Roles(Role.STAFF, Role.ADMIN, Role.MANAGER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiUnauthorizedResponse()
    @ApiQuery({ name: 'orderStatus', required: false, type: Number })
    @Get('order/all-filters/status')
    async findAllByWarehouseFiltersByStatus(
        @UserLogin() userLogin: UserLoginData,
        @Query('pageNo', ParseIntPipe) pageNo: number,
        @Query('orderStatus') orderStatus: number,
    ) {
        if (!orderStatus && orderStatus !== 0) {
            orderStatus = 0;
        }
        return await this.orderService.findAllByWarehouseFiltersByStatus(pageNo, userLogin, orderStatus);
    }
    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'View all order by warehouse of staff and filter' })
    @ApiOperation({ summary: 'View all order by warehouse of staff filter' })
    @Roles(Role.STAFF, Role.ADMIN, Role.MANAGER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiUnauthorizedResponse()
    @ApiQuery({ name: 'seachValue', required: false, type: String })
    @ApiQuery({ name: 'orderStatus', required: false, type: Number })
    @Get('order/all-filters')
    async findAllByWarehouseFilters(
        @UserLogin() userLogin: UserLoginData,
        @Query('pageNo', ParseIntPipe) pageNo: number,
        @Query('seachValue') seachValue: string,
        @Query('orderStatus') orderStatus: number,
    ) {
        if (!orderStatus && orderStatus !== 0) {
            orderStatus = 0;
        }
        if (!seachValue && orderStatus === null) {
            seachValue = '';
        }
        return await this.orderService.findAllByWarehouseFiltersUnsigned(pageNo, userLogin, seachValue, orderStatus);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'View order detail' })
    @ApiOperation({ summary: 'View order detail' })
    @Roles(Role.STAFF, Role.ADMIN, Role.MANAGER)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiUnauthorizedResponse()
    @Get('order/detail')
    async findOrderDetail(@Query('orderId', ParseIntPipe) orderId: number): Promise<Response> {
        const order = await this.orderService.findOneOrder(orderId);

        return new Response(200, 'true', order, null, 1);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'View order detail by status' })
    @ApiOperation({ summary: 'View order detail by status' })
    @Roles(Role.STAFF, Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiUnauthorizedResponse()
    @Get('order/search/status')
    async findOrderByStatus(
        @Query('status', ParseIntPipe) status: number,
        @Query('pageNo', ParseIntPipe) pageNo: number,
        @UserLogin() userLogin: UserLoginData,
    ): Promise<Response> {
        const order = await this.orderService.findOrderByStatus(pageNo, status, userLogin);

        return new Response(200, 'true', order.orders, order.paging, 1);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({ description: 'View order detail by range time' })
    @ApiOperation({ summary: 'View order detail by range time' })
    @Roles(Role.STAFF, Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiUnauthorizedResponse()
    @Get('order/search/time')
    async findOrderByTime(
        @Query('from') fromDate: string,
        @Query('to') toDate: string,
        @Query('pageNo', ParseIntPipe) pageNo: number,
        @UserLogin() userLogin: UserLoginData,
    ): Promise<Response> {
        const order = await this.orderService.findOrderByTime(pageNo, fromDate, toDate, userLogin);

        return new Response(200, 'true', order.orders, order.paging, 1);
    }
}
