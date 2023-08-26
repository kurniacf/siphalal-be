import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
    constructor() {}

    @Get()
    async check(): Promise<any> {
        return {
            message: 'Test controller is working'
        };
    }
}
