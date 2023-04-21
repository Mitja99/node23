import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
                private jwtService: jwtService) {
    }

    async signIn(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException("User with this email does not exist");
        }
        if (!(await bcrypt.compare(password, user.password))){
            throw new BadRequestException('Wrong password');
        }
        const payload = {
            "email":user.email,
            "sub":user.id
        };
        const accessToken = this.jwtService.sign(payload);

        return accessToken;
    }
}
