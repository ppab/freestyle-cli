import { IsEmail, IsString, IsEnum } from 'class-validator';

import { ProductCategory } from '../enums/email-category.enum';

export class CreateEmailDto {
  @IsEmail()
  @IsString()
  address: string;

  @IsString()
  @IsEnum(ProductCategory)
  category: string;
}
