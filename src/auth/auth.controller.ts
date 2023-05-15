/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { parse } from 'date-fns';

@Controller('auth')
export class AuthController {

  constructor(private userService: UserService){}

  @Post()
  async verifyEmail(@Body('email') email) {

    try{

      await this.userService.getByEmail(email)

      return { exists: true}

    } catch (e){
      
      return { exists: false}
    }
  }

  @Post('register')
  async register(
    @Body('name') name,
    @Body('email') email,
    @Body('birthAt') birthAt,
    @Body('phone') phone,
    @Body('document') document,
    @Body('password') password,
  ) {

    if(birthAt){
      
      try{
        
        birthAt = parse(birthAt, 'yyyy-MM-dd', new Date)
  
      } catch(e){
        throw new BadRequestException("Birth date is invalid")
      }
    }

    return this.userService.create({
      name,
      email,
      birthAt,
      phone,
      document,
      password
    })
  }
}
