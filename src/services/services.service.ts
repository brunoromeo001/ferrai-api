import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {

  constructor(private prisma: PrismaService){}

  async getAll(id?: number[]){

    return this.prisma.service.findMany(
      id instanceof Array && id.length > 0
      ? { where: {id: {in: id}} }
      : undefined
    )
  }

  async get(id: number){

    id = Number(id);

    if(isNaN(id)){
      throw new BadRequestException("ID is required");
    }

    const service = await this.prisma.service.findUnique({
      where: { id }
    })

    if (!service) {
      throw new BadRequestException("Service not found");
    }

    return service;
  }

  async create({
    name,
    description,
    price
  }: {
    name: string;
    description: string;
    price: number;
  }){

    if(!name) throw new BadRequestException("Name is required");
    if(!description) throw new BadRequestException("Description is required");
    if(!price) throw new BadRequestException("Price is required");

    price = Number(price);

    return this.prisma.service.create({
      data:{
        name,
        description,
        price
      }
    })
  }

  async update(
    id: number,
    {
      name,
      description,
      price,
    }: {
      name?: string;
      description?: string;
      price?: number;
    }
  ){

    id = Number(id);

    await this.get(id);

    const dataService = {} as Prisma.ServiceUpdateInput;

    if(name) dataService.name = name;

    if(description) dataService.description = description;

    if(price) dataService.price = price;

    return this.prisma.service.update({
      data: dataService,
      where: {
        id,
      }
    })
  }

  async delete(id: number){
    return {}
  }

  async getAmount(services: string): Promise<number>{

    const servicesId = services
    ? services
      .split(',')
      .map(id => Number(id))
      .filter((id) => !isNaN(id))
    : [];

    if(services.length === 0){
      throw new BadRequestException("Services are required")
    }

    return Number(
      (await this.getAll(servicesId))
        .map((service) => Number(service.price))
        .reduce((a, b) => a +b)
    )
  }
}
