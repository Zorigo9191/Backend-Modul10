import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { SupabaseProvider } from '../common/provider/supabase/supabase.js';
import { VerifyLoginDto } from './dto/verify-login.dto.js';

@Injectable()
export class UserService {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  async login(loginDto: LoginDto) {
    const { error } = await this.supabaseProvider
      .getSupabaseClient()
      .auth.signInWithOtp({ email: loginDto.email });

    if (error) {
      throw error;
    }
  }

  async verify(verifyLoginDto: VerifyLoginDto) {
    const {
      data: { session },
      error,
    } = await this.supabaseProvider.getSupabaseClient().auth.verifyOtp({
      email: verifyLoginDto.email,
      token: verifyLoginDto.otp,
      type: 'email',
    });

    if (error) {
      throw error;
    }
    console.log(session);
    return session;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
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
}
