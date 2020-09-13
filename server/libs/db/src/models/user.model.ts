import {modelOptions, prop} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    // 供swagger使用
    @ApiProperty({
        description: '用户名',
        example: 'user'
    })
    @prop()
    username: string

    @ApiProperty({
        description: '密码',
        example: 'pass'
    })
    @prop()
    password: string
}