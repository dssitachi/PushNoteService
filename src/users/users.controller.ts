import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('employees')
export class UsersController {
	constructor(private userService: UsersService) { }

	@HttpCode(HttpStatus.OK)
	@Get('')
	getEmployees() {
		return this.userService.findAll();
	}
}