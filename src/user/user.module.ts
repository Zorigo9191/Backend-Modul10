import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { SupabaseProviderModule } from '../common/provider/supabase/supabase.module.js';

@Module({
  imports: [SupabaseProviderModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
