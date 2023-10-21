import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() signInDto: Record<string, any>) {
		return this.authService.signIn(signInDto.email, signInDto.password, signInDto.token);
	}

	@Public()
	@Post('register')
	signUp(@Body() signUpDto: Record<string, any>) {
		return this.authService.signUp(signUpDto.name, signUpDto.email, signUpDto.password, signUpDto.token);
	}
}