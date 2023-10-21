import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PushTokensService } from 'src/push-tokens/push-tokens.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private pushTokenService: PushTokensService    
    ) { }

    async signIn(email: string, pass: string, token: string): Promise<any> {

        const user = await this.usersService.findOne(email);
        const { password, ...result } = user;

        if (!user) {
            throw new UnauthorizedException("Incorrect email or password");
        }
        if (!(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException("Incorrect email or password");
        }

        const payload = { email: user.email, userId: user.userId};
        await this.pushTokenService.create({userId: user.userId, token });
        return {
            token: await this.jwtService.signAsync(payload),
            isAdmin: user.email === "admin"
        };
    }

    async signUp(name: string, email: string, password: string, token: string): Promise<any> {
        const user = await this.usersService.create(name, email, password);
        await this.pushTokenService.create({userId: user.userId, token });
        const payload = { email: user.email, userId: user.userId};
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }
}