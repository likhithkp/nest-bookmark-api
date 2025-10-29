import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class PhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  dialCode: string;

  @IsNotEmpty()
  @IsString()
  number: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PhoneNumberDto)
  phoneNumber: PhoneNumberDto;

  @IsOptional()
  @IsString()
  avatar?: string;
}
