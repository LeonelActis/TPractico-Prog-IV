import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: any) {
    if (!googleUser.email) {
      throw new HttpException('Google no devolvió un email', HttpStatus.BAD_REQUEST);
    }

    
    let user = await this.usersService.findByGoogleId(googleUser.googleId);

    if (!user) {
      
      const byEmail = await this.usersService.findByEmail(googleUser.email);
      if (byEmail) {
        user = await this.usersService.update(byEmail.id, {
          googleId: googleUser.googleId,
        });
      } else {
        
        user = await this.usersService.create(googleUser);
      }
    }

    
    const jwt = this.jwtService.sign({ sub: user.id, email: user.email });
    return { ...user, jwt };
  }
}