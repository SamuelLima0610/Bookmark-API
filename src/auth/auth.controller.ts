import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post("signin")
    signIn(){
        return "I am sign in"
    }

    @Post("signup")
    signUp(){
        return "I am sign up"
    }
}