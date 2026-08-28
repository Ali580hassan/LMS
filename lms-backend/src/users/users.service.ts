import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Naya user create karta hai (database mein save karta hai)
  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  // Email se user dhoondta hai — login aur "email already exists" check ke liye zaroori
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // ID se ek user dhoondta hai — jaise profile fetch karne ke liye
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Sab users list karta hai (admin dashboard jaisay features ke liye)
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Profile update karta hai
  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findById(id); // pehlay check karo user exist karta hai
    Object.assign(user, data);
    return this.userRepository.save(user);
  }
}