import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types.js';
import { ConfigService } from '@nestjs/config';
import { ConfigInterface } from '../config/config.type.js';

@Injectable()
export class SupabaseProvider {
  private readonly supabaseClient: SupabaseClient<Database>;

  constructor(private readonly configService: ConfigService<ConfigInterface>) {
    const supabaseUrl = this.configService.get('SUPABASE_URL');
    const supabaseKey = this.configService.get('SUPABASE_KEY');

    this.supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
  }

  getSupabaseClient(): SupabaseClient<Database> {
    return this.supabaseClient;
  }
}
