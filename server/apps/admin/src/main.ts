import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    // 静态文件托管
    app.useStaticAssets('uploads', {
        prefix: '/uploads'
    })
    const options = new DocumentBuilder()
        .setTitle('英语角后台管理API')
        .setDescription('供英语角后台管理界面调用的API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(3000);
    console.log("http://localhost:3000/api-docs")


}

bootstrap();
