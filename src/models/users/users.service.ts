import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import slugify from 'slugify';
import { PasswordManager } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateUserInputs } from './dtos/create-user.inputs';
import { UpdateUserInputs } from './dtos/update-user-inputs';
import { User } from './User';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUserInputs(inputs: CreateUserInputs): Promise<
    CreateUserInputs & {
      username: string;
      password: string;
      generatedPassword: string;
    }
  > {
    const username = slugify(inputs.firstName + ' ' + inputs.lastName);

    const nameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    const phoneAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        phone: inputs.phone,
      },
    });
    if (inputs.cin) {
      const cinAlreadyExist = await this.prisma.user.findUnique({
        where: {
          cin: inputs?.cin,
        },
      });
      if (cinAlreadyExist) {
        throw new BadRequestException('CIN already exist');
      }
    }
    const fullNameAlreadyExistPromise = this.prisma.user.findUnique({
      where: {
        fullName: {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
        },
      },
    });
    // check if username of phone number in use
    const checksResult = await Promise.all([
      nameAlreadyExistPromise,
      phoneAlreadyExistPromise,
      fullNameAlreadyExistPromise,
    ]);
    const fields = ['username', 'phone', 'firstName and lastName'];
    checksResult.forEach((user, idx) => {
      if (user) {
        throw new BadRequestException(`${fields[idx]} Already exist`);
      }
    });

    const generatedPassword = PasswordManager.generatePassword();
    const hashedPassword = await PasswordManager.hash(generatedPassword);
    return {
      ...inputs,
      username,
      generatedPassword,
      password: hashedPassword,
    };
  }

  async updateUserInformation(
    id: number,
    inputs: UpdateUserInputs,
  ): Promise<User> {
    const { address, phone, photo } = inputs;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // @TODO add check for phone number
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        phone: phone ?? user.phone,
        address: address ?? user.address,
        photo: photo ?? user.photo,
      },
    });
  }
}
