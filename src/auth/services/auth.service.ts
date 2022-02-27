import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from '~auth/http/dto/signin.dto';
import { SignUpDto } from '~auth/http/dto/signup.dto';
import { hash } from 'bcrypt';
import { UserService } from '~users/services/user.service';

@Injectable()
export class AuthService {
  private salt = 10;

  constructor(private userService: UserService) {}

  async signIn(signInDto: SignInDto) {
    const { email } = signInDto;
    const user = await this.userService.findByEmailNotFail(email);

    if (!user) {
      throw new BadRequestException();
    }
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
