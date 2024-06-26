import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class updateStaffDto {
    @IsNumber()
    @IsNotEmpty({ message: 'Null value error for staff' })
    @ApiProperty({ example: '1', description: 'staffId of Staff' })
    staffId: number;

    @ApiProperty({ example: 'teststaffName', description: 'fullname of Staff' })
    @IsString()
    fullname: string;

    @ApiProperty({ example: 'testStaffEmail@gmail.com', description: 'email of Staff' })
    @IsEmail()
    email: string;

    @IsString()
    @Matches(/^[0-9]+$/, { message: 'Invalid phone number format. Please enter only numeric characters.' })
    @ApiProperty({ example: '096143152', description: 'phone number of Staff' })
    phone: string;

    @IsString()
    @ApiProperty({ example: '096143152', description: 'warehouseId of Staff' })
    warehouseId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Null value error for status' })
    @ApiProperty({ example: '1', description: 'status of Staff' })
    status: number;
}
