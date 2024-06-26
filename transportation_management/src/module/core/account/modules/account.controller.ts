import { Body, Controller, Get, Param, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'src/module/response/Response';
import { Paging } from 'src/module/response/Paging';
import { AccountEntity } from '../../../../entities/account.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { changePasswordDto } from '../dto/changePass_dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseRuleEntity } from 'src/entities/warehouse-rule.entity';
import { Repository } from 'typeorm';
@ApiTags('account-api')
@Controller('account')
export class AccountController {
    constructor(
        private readonly accountService: AccountService,
        private configService: ConfigService,
        @InjectRepository(WarehouseRuleEntity)
        private readonly warehouseRuletRepository: Repository<WarehouseRuleEntity>,
    ) {}
    @Get('getAll')
    async getAllAccounts() {
        try {
            const data = await this.accountService.getAllAccount();
            const currentPage = 1;
            const pageSize = 5;
            const totalCount = parseInt(data[1].toString());
            const pagingRes = new Paging(currentPage, pageSize, totalCount);
            const response = new Response(200, 'success', data[0], pagingRes, 1);
            return response;
        } catch (error) {}
    }
    @Get('findone:id')
    //@UseGuards(AuthenticationGuard)
    //@ApiBearerAuth('JWT-auth')
    findOneAccountbyId(@Param('id') id: string): Promise<AccountEntity> {
        return this.accountService.getAccountById(Number(id));
    }
    @Put('updatePaasword')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @UsePipes(ValidationPipe)
    async updateCustomerPass(@Body() pass: changePasswordDto, @Req() request: Request) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        return this.accountService.updateCustomerPass(pass, token);
    }
    @Get('getdistance')
    async getDistance(@Query('warehouse1') warehouse1: number, @Query('warehouse2') warehouse2: number) {
        try {
            const warehouseRule = await this.warehouseRuletRepository
                .createQueryBuilder('w')
                .where((qb) => {
                    qb.andWhere('(w.warehouse_id_1 = :warehouseId1 AND w.warehouse_id_2 = :warehouseId2)', {
                        warehouseId1: Number(warehouse1),
                        warehouseId2: Number(warehouse2),
                    }).orWhere('(w.warehouse_id_1 = :warehouseId2 AND w.warehouse_id_2 = :warehouseId1)', {
                        warehouseId1: Number(warehouse2),
                        warehouseId2: Number(warehouse1),
                    });
                })
                .getOne();
            console.log(warehouseRule);
            const distance = Number(
                warehouseRule.distance.includes(',')
                    ? warehouseRule.distance.replace(',', '.')
                    : warehouseRule.distance,
            );
            console.log(distance);
            return distance;
        } catch (error) {}
    }
}
