import { Module } from '@nestjs/common';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
      ],
      envFilePath: ['.env'],
    }),
    I18nModule.forRootAsync({
      // useFactory: (configService: ConfigService<AllConfigType>) => ({
      //   fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
      //     infer: true,
      //   }),
      //   loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      // }),
      // resolvers: [
      //   {
      //     use: HeaderResolver,
      //     useFactory: (configService: ConfigService<AllConfigType>) => {
      //       return [
      //         configService.get('app.headerLanguage', {
      //           infer: true,
      //         }),
      //       ];
      //     },
      //     inject: [ConfigService],
      //   },
      // ],
      // imports: [ConfigModule],
      // inject: [ConfigService],
    }),
    PrismaModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
