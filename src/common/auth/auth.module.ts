import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigInterface } from '../provider/config/config.type.js';
import { JwksClient } from 'jwks-rsa';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<ConfigInterface>) => {
        const client = new JwksClient({
          jwksUri: configService.get<string>('JWKS_URI', ''),
          requestHeaders: {},
          timeout: 30000,
        });

        const kid = configService.get<string>('JWKS_KEY_ID', '');
        const key = await client.getSigningKey(kid);
        const signingKey = key.getPublicKey();

        return {
          publicKey: signingKey,
          global: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [JwtModule],
})
export class AuthModule {}
