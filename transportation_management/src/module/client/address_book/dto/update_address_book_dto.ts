import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAddresBookDto {
    @ApiProperty({ example: '1', description: 'book_id' })
    @IsNotEmpty({ message: 'Null value book_id' })
    @IsNumber()
    book_id: number;

    @ApiProperty({ example: 'so nha 120 ngo A', description: 'house' })
    @IsNotEmpty({ message: 'Null value house' })
    house: string;

    @ApiProperty({ example: '1', description: 'city_id' })
    @IsNotEmpty({ message: 'Null value city_id' })
    @IsNumber({ allowNaN: false })
    city_id: number;

    @ApiProperty({ example: '1', description: 'district_id' })
    @IsNotEmpty({ message: 'Null value district_id' })
    @IsNumber({ allowNaN: false })
    district_id: number;

    @ApiProperty({ example: '1', description: 'ward_id' })
    @IsNotEmpty({ message: 'Null value ward_id' })
    @IsNumber({ allowNaN: false })
    ward_id: number;
}