import {
	IsInt,
	IsOptional,
	IsString,
	Min,
	Length,
  } from 'class-validator';

export class CreateItemDto {
	@IsOptional()
	@IsString()
	@Length(3, 100)
	name?: string;

	@IsInt()
	@Min(1)
	price?: number;
}
  