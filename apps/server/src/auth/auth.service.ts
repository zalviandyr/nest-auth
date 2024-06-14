import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authSchema: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async me(authId: string) {
    return await this.authSchema.findById(authId);
  }

  async register(registerDto: RegisterDto): Promise<Auth> {
    registerDto.password = await this.hashPassword(registerDto.password);

    return await this.authSchema.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const auth = await this.authSchema.findOne({
      username: loginDto.username,
    });

    const isValid = this.validatePassword(loginDto.password, auth?.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: auth._id, username: auth.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      ...auth.toJSON(),
    };
  }

  private async hashPassword(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }

  private validatePassword(value: string, hashedValue?: string): boolean {
    if (!hashedValue) return false;

    return bcrypt.compareSync(value, hashedValue);
  }
}
