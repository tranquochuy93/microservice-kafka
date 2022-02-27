import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '~auth/services/auth.service';
import { SignInDto } from '../dto/signin.dto';
import { SignUpDto } from '../dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    await this.authService.signIn(signInDto);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
