import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PostsModel } from './posts/entities/posts.entity';
import { PostsModule } from './posts/posts.module';
import { UsersModel } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 49152,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostsModel, UsersModel],
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
