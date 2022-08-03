import {
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';


@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){

    }

    async login(dto: AuthDto){
        // find the user by email
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            },
        });
        // if user does not exists throw a exception
        if (!user)
            throw new ForbiddenException(
            'Credentials incorrect',
            );
        // compare password
        const pwMatches = await argon.verify(user.hash, dto.password)
        // if password incorrect throw exception
        if (!pwMatches)
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        // send back the user
        delete user.hash
        return user
    }

    async signUp(dto: AuthDto){
        try{
            // generate the password hash
            const hash = await argon.hash(dto.password);
            //save in the db
            const user = await this.prisma.user.create({
                data: {
                email: dto.email,
                hash,
                }
            });
            //return the user
            return user
        }catch(error){
            if (
                error instanceof
                PrismaClientKnownRequestError
              ) {
                if (error.code === 'P2002') {
                  throw new ForbiddenException(
                    'Credentials taken',
                  );
                }
              }
              throw error;
        }
    }
}