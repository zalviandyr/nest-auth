import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'mongoose';

@ValidatorConstraint({ name: 'IsUnique', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private connection: Connection) {}

  async validate(value: any, args: ValidationArguments) {
    const [schema] = args.constraints;
    const result = await this.connection.models[schema].findOne({
      [args.property]: value,
    });

    return !result;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const [schema] = validationArguments.constraints;

    return `'${validationArguments.value}' has already been taken in ${schema}`;
  }
}
