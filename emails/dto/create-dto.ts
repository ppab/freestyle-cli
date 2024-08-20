import { IsEmail, IsString, IsEnum } from 'class-validator';
  
  import { EmailCategory } from "../enums/email-category.enum";
  
  export class CreateEmailDto {
      @IsEmail()
  @IsString()
  address: string;

  @IsString()
  @IsEnum(EmailCategory)
  category: string;
  }