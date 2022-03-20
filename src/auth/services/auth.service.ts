import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { SignInDto } from '~auth/http/dto/signin.dto';
import { SignUpDto } from '~auth/http/dto/signup.dto';
import { env } from '~config/env.config';
import { UserService } from '~users/services/user.service';

@Injectable()
export class AuthService {
  private salt = 10;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password: inputtedPassword } = signInDto;
    const user = await this.userService.findByEmailNotFail(email);
    if (!user) {
      throw new BadRequestException({ translate: 'error.incorrect_email' });
    }

    const { password, ...responseUser } = user;
    const isValidPassword = await compare(inputtedPassword, password);
    if (!isValidPassword) {
      throw new BadRequestException({ translate: 'error.incorrect_password' });
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: env.JWT.EXPIRE,
    });

    return {
      ...responseUser,
      token: accessToken,
      expiredAt: (this.jwtService.decode(accessToken) as any).exp,
      // refreshTokenExpiredAt: (this.jwtService.decode())
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const { password, email } = signUpDto;
    const user = await this.userService.findByEmailNotFail(email);

    if (user) {
      throw new BadRequestException({ translate: 'error.not_unique_email' });
    }

    const hashedPassword = await hash(password, this.salt);

    return this.userService.save({
      ...signUpDto,
      password: hashedPassword,
    });
  }
}
