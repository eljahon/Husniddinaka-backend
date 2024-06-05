import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

export type TypeProps = {
  table: string;
  column: string;
};

@ValidatorConstraint({ async: true })
export class IsHaveConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}
  async validate(value: any, args: ValidationArguments) {
    const { table, column }: TypeProps = args.constraints[0];
    const dataExist = await this.entityManager
      .getRepository(table)
      .createQueryBuilder(table)
      .where({ [column]: value })
      .getExists();
    console.log(dataExist);
    return !dataExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `${field} is not found`;
  }
}

export function IsHave(property: any, validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isHave',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsHaveConstraint,
    });
  };
}
