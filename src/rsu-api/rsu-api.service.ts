import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RsuApiService {
    constructor(private readonly configService: ConfigService) { }

    getApiKey(): string {
        const apiKey = this.configService.get<string>("RSU_API_KEY");
        if (!apiKey) {
            throw new Error("RSU_API_KEY is not configured.");
        }
        return apiKey;
    }
}
