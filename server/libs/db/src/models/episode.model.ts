import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";
import {Course} from "@libs/db/models/course.model";

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

    @prop({ref: 'Course'})
    course: Ref<Course>
}
