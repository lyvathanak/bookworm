import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { PublicUsersController } from './public-users.controller'; // <-- ADD THIS LINE

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, PublicUsersController], // This line is perfect
  providers: [UsersService],
  exports: [UsersService], // Export for use in AuthModule
})
export class UsersModule {}
