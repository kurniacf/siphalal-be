import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {EntityManager} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService
    ) {}

  async create(createUserDto: CreateUserDto) {
    //find username
    const username = createUserDto.username;
    const findUser = await this.userRepository.findOneBy({username});
    if(findUser) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }
    const user = new User(createUserDto.username, createUserDto.password);
    return await this.entityManager.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  //auth
  async login(loginUserDto: LoginUserDto) {
    const username = loginUserDto.username;
    const user = await this.userRepository.findOneBy({username});
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if(user.password !== loginUserDto.password) {
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    }
    const payload = {username: user.username, sub: user.id};
    console.log(payload);
    return {
      message: 'Login success',
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
