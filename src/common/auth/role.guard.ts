import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum.js';
import { ROLES_KEY } from './role.decorator.js';

import { SupabaseProvider } from '../provider/supabase/supabase.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly supabaseProvider: SupabaseProvider,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user }: { user: { sub: string } } = context
      .switchToHttp()
      .getRequest();
    console.log(user);
    const { data, error } = await this.supabaseProvider
      .getSupabaseClient()
      .from('users_roles')
      .select('*')
      .limit(1)
      .eq('userId', user.sub)
      .single();

    if (error) {
      throw error;
    }

    console.log(data, requiredRoles);
    return requiredRoles.some((role) => data.roleName === role);
  }
}
