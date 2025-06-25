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

  /**
   * Validates a user for the ADMIN login.
   * Throws an error if the user is not an administrator.
   */
async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException('Access Denied. User is not an administrator.');
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Validates a user for the PUBLIC login.
   * Does NOT check for role.
   */
  async validatePublicUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.uid, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
