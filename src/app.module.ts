import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';


@Module({
  imports: [
    AuthModule,
    UserModule, 
    BookmarkModule, 
    ConfigModule.forRoot({
      load: [configuration],
    })
  ],
})
export class AppModule {}
