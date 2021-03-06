import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    const options = new DocumentBuilder()
        .setTitle('英语角后台管理API')
        .setDescription('供英语角后台管理界面调用的API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
    const PORT = process.env.ADMIN_PORT || 3000

    await app.listen(PORT);
    console.log(`http://localhost:${PORT}/api-docs`)


}

bootstrap();
