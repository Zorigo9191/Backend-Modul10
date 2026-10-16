import { Module } from '@nestjs/common';
import { SupabaseProvider } from './supabase.js';

@Module({
  providers: [SupabaseProvider],
  exports: [SupabaseProvider],
})
export class SupabaseProviderModule {}
