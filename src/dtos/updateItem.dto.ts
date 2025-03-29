import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  Length,
} from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  price?: number;
}
