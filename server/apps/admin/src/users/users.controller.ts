import {Controller, Get} from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {User} from "@libs/db/models/user.model";
import {Crud} from "nestjs-mongoose-crud";
import {ApiTags} from "@nestjs/swagger";

@Crud({
    model: User
})

@Controller('users')
@ApiTags('用户')
export class UsersController {
    // 注入模型 给 谁
    constructor(@InjectModel(User) private readonly model) {
    }

    @Get('option')
    option() {
        return {
            title: '用户管理',
            column: [
                // sortable aVue添加这个字段可本地排序
                {prop: 'username', label: '用户名', sortable: true, search: true}
            ]
        }
    }
}
