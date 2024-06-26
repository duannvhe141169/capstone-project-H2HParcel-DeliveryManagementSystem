import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsObject, IsString, Matches } from 'class-validator';

export class DetailCustommerDto {
    @ApiProperty({ example: 'cus_id', description: 'The Customer ID' })
    @IsNumberString()
    @IsNotEmpty({ message: 'Null value error' })
    cus_id: number;
    @IsString()
    @ApiProperty({ example: 'fullname', description: 'The fullname' })
    @IsNotEmpty({ message: 'Null value error' })
    fullname: string;

    @IsEmail()
    @ApiProperty({ example: 'fullname', description: 'The fullname' })
    @IsNotEmpty({ message: 'Null value error' })
    email: string;

    @IsEmail()
    @ApiProperty({ example: 'username', description: 'The username' })
    @IsNotEmpty({ message: 'Null value error' })
    username: string;

    @IsString()
    @ApiProperty({ example: 'phone', description: 'The phone' })
    @IsNotEmpty({ message: 'Null value error' })
    @Matches(/^[0-9]+$/, { message: 'Invalid phone number format. Please enter only numeric characters.' })
    phone: string;

    @IsObject()
    @IsNotEmpty({ message: 'Null value error for house' })
    @ApiProperty({ example: 'Address', description: 'house' })
    house: string;

    @IsObject()
    @IsNotEmpty({ message: 'Null value error for cityId' })
    @ApiProperty({ example: 'Address', description: 'cityId' })
    cityId: number;

    @IsObject()
    @IsNotEmpty({ message: 'Null value error for city' })
    @ApiProperty({ example: 'Address', description: 'city' })
    city: string;

    @IsObject()
    @IsNotEmpty({ message: 'Null value error for districtId' })
    @ApiProperty({ example: 'Address', description: 'districtId' })
    districtId: number;
    @IsObject()
    @IsNotEmpty({ message: 'Null value error for district' })
    @ApiProperty({ example: 'Address', description: 'district' })
    district: string;

    @IsObject()
    @IsNotEmpty({ message: 'Null value error for wardId' })
    @ApiProperty({ example: 'Address', description: 'wardId' })
    wardId: number;
    @IsObject()
    @IsNotEmpty({ message: 'Null value error for ward' })
    @ApiProperty({ example: 'Address', description: 'ward' })
    ward: string;
}
