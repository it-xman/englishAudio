import {Controller, Get} from '@nestjs/common';
import {Crud} from "nestjs-mongoose-crud";
import {Episode} from "@libs/db/models/episode.model";
import {ApiTags} from "@nestjs/swagger";
import {InjectModel} from "nestjs-typegoose";
import {ReturnModelType} from "@typegoose/typegoose";

@Crud({
    model: Episode
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
    constructor(@InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>) {
    }

    @Get('option')
    option() {
        return {
            title: '课时管理',
            column: [
                {prop: 'name', label: '课时名称', sortable: true, search: true, regex: true}
            ]
        }
    }
}
