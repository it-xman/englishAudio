import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {CoursesModule} from './courses/courses.module';
import {EpisodesModule} from './episodes/episodes.module';
// @ts-ignore
import {CommonModule} from "@app/common";

@Module({
    imports: [
        CommonModule,
        UsersModule,
        CoursesModule,
        EpisodesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
