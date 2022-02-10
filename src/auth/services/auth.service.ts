import { BadRequestException, Injectable } from "@nestjs/common";
import { SignInDto } from "~auth/http/dto/signin.dto";
import { SignUpDto } from "~auth/http/dto/signup.dto";
import { UserRepository } from "~users/repositories/user.repository";
import { hash } from "bcrypt";
import { UserService } from "~users/services/user.service";

@Injectable()
export class AuthService {
    private salt = 10;

    constructor(private userService: UserService) {}

    async signIn(signInDto: SignInDto) {
        const { email, password } = signInDto;
        const user = this.userService.findByEmailNotFail(email);

        if (!user) {
            throw new BadRequestException();
        }
    }

    async signUp(signUpDto: SignUpDto) {
        const { password, email } = signUpDto;
        const user = this.userService.findByEmailNotFail(email);

        if (user) {
            throw new BadRequestException();
        }

        const hashedPassword = await hash(password, this.salt)

        return this.userService.save({
            ...signUpDto,
            password: hashedPassword
        })
    }
}