import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    // First, check if user exists and password is correct
    if (user && (await bcrypt.compare(pass, user.password))) {
      
      // THIS IS THE NEW, CRITICAL CHECK
      // After validating the password, check if the user has the 'admin' role.
      if (user.role !== UserRole.ADMIN) {
        // If they are a normal user, throw a specific error.
        throw new UnauthorizedException('Access Denied. User is not an administrator.');
      }

      // If they are an admin, proceed.
      const { password, ...result } = user;
      return result;
    }
    
    // If the initial user/password check fails, return null.
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.uid, role: user.role }; // Add role to JWT
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
