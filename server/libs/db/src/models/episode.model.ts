import {modelOptions, prop} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class Episode {
    // 供swagger使用
    @ApiProperty({
        description: '课时名称'
    })
    @prop()
    name: string

    @ApiProperty({
        description: '保存文件'
    })
    @prop()
    file: string
}
