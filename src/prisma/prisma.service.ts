import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { ConfigService } from '@nestjs/config';
import { error } from 'console';


@Injectable()
export class PrismaService extends PrismaClient {

    constructor(configService: ConfigService) {
        const url = configService.get("DATABASE_URL");

        if (!url) {
            throw new Error('DATABASE_URL is not defined');
        }

        super({
            adapter: new PrismaMariaDb(url),
        });
    }
}
