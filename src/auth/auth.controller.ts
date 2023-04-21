import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {request} from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    signIn(@Request() reg){
        return reg.user;
    }
}
