import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService){}

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {

    id = Number(id);

    if(isNaN(id)){
      throw new BadRequestException("ID is not a number")
    }

    return this.prisma.contact.findUnique({
      where: {id},
    })
  }

  async create({
    name,
    email,
    message
  }: {
    name: string;
    email: string;
    message: string;
  }) {

    if(!name || !email || !message){
      throw new BadRequestException("One or more fields are empty")
    }

    let personId: number;

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { personId: true },
    });

    if(user){

      personId = Number(user.personId);

    }else{
      const contact = await this.prisma.contact.findFirst({
        where: { email }
      })

      if(contact){

        personId = Number(contact.personId);
      } else {
        const newPerson = await this.prisma.person.create({
          data: {
            name,
          }
        })

        if (newPerson){
          personId = Number(newPerson.id)
        }
      }
    }

    return this.prisma.contact.create({
      data:{
        personId,
        email,
        message
      }
    })
  }

  async delete(id: number) {

    id = Number(id);

    if(isNaN(id)){
      throw new BadRequestException("ID is not a number")
    }

    await this.findOne(id)

    return this.prisma.contact.delete({
      where: {id}
    });

  }
}
