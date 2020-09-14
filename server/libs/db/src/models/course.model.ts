import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";
import {Episode} from "@libs/db/models/episode.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Course {
    // 供swagger使用
    @ApiProperty({
        description: '课程名称'
    })
    @prop()
    name: string

    @ApiProperty({
        description: '封面图'
    })
    @prop()
    cover: string

    @prop({ref: 'Episode'})
    episodes: Ref<Episode>[]

}
