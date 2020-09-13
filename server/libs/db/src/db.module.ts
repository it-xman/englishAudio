import {Global, Module} from '@nestjs/common';
import {DbService} from './db.service';
import {TypegooseModule} from "nestjs-typegoose";
import {User} from "@libs/db/models/user.model";

// 统一引用模型
const models = TypegooseModule.forFeature([User])

@Global()
@Module({
    imports: [
        // 连接数据库
        TypegooseModule.forRoot(`mongodb://localhost/englishRadio`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }),
        // 全局导入模型
        models
    ],
    providers: [DbService],
    exports: [DbService,
        // 导出模型
        models
    ],
})
export class DbModule {
}
