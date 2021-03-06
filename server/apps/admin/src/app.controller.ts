import {Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";

const Minio = require('minio')

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    db = null;

    DB() {
        if (this.db === null) {
            this.db = new Minio.Client({
                endPoint: process.env.ENDPOINT,
                port: parseInt(process.env.PORT),
                useSSL: false,
                accessKey: process.env.ACCESS_KeEY,
                secretKey: process.env.SECRET_KEY
            })
        }
        return this.db
    }


    @Get()
    getHello(): string {
        return this.appService.getHello();
    }


    @Get('mp3')
    async search() {
        return await this.DB().listBuckets()
    }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile('file') file) {

        // console.log(file)


        let hasBucket = await this.DB().bucketExists('userimage');

        if (!hasBucket) {
            await this.DB().makeBucket('userimage', 'cn-north-1')
        }
        let metaData = {
            'Content-Type': `${file.mimetype}`,
            'X-Amz-Meta-Testing': 1234,
            'example': 5678
        }

        let res = await this.DB().putObject('userimage', file.originalname, file.buffer, metaData)
        if (res) {
            return {
                url: await this.DB().presignedUrl('GET', 'userimage', file.originalname)
            }
        }
        return {
            code: 404,
            message: '服务没找到'
        }


    }

}
