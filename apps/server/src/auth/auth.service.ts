import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authSchema: Model<Auth>,
  ) {}

  async register(registerDto: RegisterDto): Promise<Auth> {
    return await this.authSchema.create(registerDto);
  }

  login(loginDto: LoginDto) {
    console.log(loginDto);

    return 'This action adds a new auth';
  }
}
