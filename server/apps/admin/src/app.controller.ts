import {Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";

const Minio = require('minio')
const minioClient = new Minio.Client({
    endPoint: 'atlantide.top',
    port: 9000,
    useSSL: true,
    accessKey: 'Ce7YgKFL73veLqEea',
    secretKey: 'Wt3h2MThePHD2D9n5RdVquLdTeHd14vwT'
});

const path = require('path')

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }


    @Get('mp3')
    async search() {
        return await minioClient.listBuckets()
    }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile('file') file) {

        // console.log(file)


        // let hasBucket = await minioClient.bucketExists('userimage');
        //
        // if (!hasBucket) {
        //     await minioClient.makeBucket('userimage', 'cn-north-1')
        // }
        let metaData = {
            'Content-Type': `${file.mimetype}`,
            'X-Amz-Meta-Testing': 1234,
            'example': 5678
        }
        // let localPath = path.resolve(`./uploads/img/${file.filename}`)
        //
        //
        await minioClient.putObject('userimage', file.originalname, file.buffer, metaData)
        // if (!res) {
        //     return {
        //         err: '错误'
        //     }
        // }
        return {
            url: await minioClient.presignedUrl('GET', 'userimage', file.originalname)
        }
    }

}
