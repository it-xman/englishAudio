import {Global, Module} from '@nestjs/common';
import {DbService} from './db.service';
import {TypegooseModule} from "nestjs-typegoose";
import {User} from "@libs/db/models/user.model";
import {Course} from "@libs/db/models/course.model";
import {Episode} from "@libs/db/models/episode.model";

// 统一引用模型
const models = TypegooseModule.forFeature([User, Course, Episode])

@Global()
@Module({
    imports: [
        // 连接数据库  异步加载读取 process.env
        TypegooseModule.forRootAsync({
            useFactory() {
                return {
                    uri: process.env.DB,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                }
            }
        }),

        // TypegooseModule.forRoot(process.env.DB, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // }),
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
