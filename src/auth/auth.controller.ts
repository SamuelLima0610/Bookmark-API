import { Body, Controller, HttpCode, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @HttpCode(200)
    @Post("signin")
    signIn(@Body() dto: AuthDto){
        return this.authService.login(dto);
    }

    @HttpCode(201)
    @Post("signup")
    signUp(@Body() dto: AuthDto){
        console.log({
            dto
        })
        return this.authService.signUp(dto);
    }
}