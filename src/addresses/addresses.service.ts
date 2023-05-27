import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { isValidNumber } from '../utils/validation-number';

@Injectable()
export class AddressesService {

  constructor(private readonly prisma: PrismaService, private httpService: HttpService) { }

  // Criando método que verifica qual endereço de um usuário

  async findByPeson(personId: number){
    return await this.prisma.address.findMany({
      where:{
        personId: Number(personId),
      },
    });
  }

  async create(userId: number, createAddressDto: CreateAddressDto) {

    const {
      street,
      number,
      complement,
      country,
      district,
      city,
      state,
      zipCode
    } = createAddressDto;

    const { personId } = await this.prisma.user.findUnique({
      where:{
        id: isValidNumber(userId)
      },
      select: {
        personId: true
      }
    });

    if (!personId) {
      throw new NotFoundException(`Could not find person for user ${userId}`);
    }

    return this.prisma.address.create({
      data:{
        person:{
          connect: {
            id: personId
          }
        },
        street,
        number,
        complement,
        country,
        district,
        city,
        state,
        zipCode
      },

    });
  }

  findAll() {
    return `This action returns all addresses`;
  }

  async findOne(id: number) {
    const address = await this.prisma.address.findUnique({
      where:{
        id: isValidNumber(id),
      },
    });

    if(!address){
      throw new NotFoundException(`Could not find address for id ${id}`);
    }
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
