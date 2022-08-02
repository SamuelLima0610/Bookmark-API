import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";



@Injectable({})
export class PrismaService extends PrismaClient{
    constructor(){
        super({
            datasources:{
                db:{
                    url: "mysql://root:samuel0610@localhost:3306/bookmark?schema=public"
                }
            }
        })
    }
}