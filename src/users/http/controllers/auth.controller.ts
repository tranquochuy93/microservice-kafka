import { Controller, Post } from '@nestjs/common';
import { AuthService } from '~auth/services/auth.service';
import { SignInDto } from '../dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    async signIn(signInDto: SignInDto) {
        await this.authService.signIn(signInDto)
    }

    // @Post('signup')
    // async signUp(signInDto: SignUpDto) {
    //     await this.authService.signIn(signInDto)
    // }
}