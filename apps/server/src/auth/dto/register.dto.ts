import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { Auth } from '../entities/auth.entity';
import { IsUnique } from 'src/app/decorator/is-unique.decorator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsUnique, [Auth.name])
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
