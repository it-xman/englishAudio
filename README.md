# 前端全栈开发

## 开发步骤

#### 全局安装nest.js

```
yarn global add @nestjs/cli
```

#### 使用nest.js创建server服务，编写服务端代码

```
nest new server
```

#### 因为涉及两个服务端模块，使用单体仓库模式

- 进入到server文件夹，创建子应用
  - 在server文件夹下创建名为admin的子项目
  - 不同的项目对应不同的服务

```
nest g app (admin) //可自定义
```

### 运行admin服务

```
nest start -w admin
```

### 公用模块

- 数据库公用，创建一个数据库模块

```
nest g lib db
// @libs 可选 默认路径
```

### 数据库模块开发

#### 安装 下面几个模块

`nestjs-typegoose // 在nest使用  `

`@typegoose/typegoose // 基于ts的封装`

`mongoose // 数据库模块`

`@types/mongoose // TS数据库模块类型提示`

- 全局引用模型

- ```
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
          TypegooseModule.forRoot(`mongodb://localhost/数据库名`, {
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
  ```

- 在数据库模块中创建用户模型

  ```
  // 在libs/db/src下新建models文件夹
  // 创建 user.model.ts 文件
  // 利用prop创建两个属性并定义数据类型
  import {prop} from "@typegoose/typegoose";
  
  export class User {
      @prop()
      username: string
      
      @prop()
      password: string
  }
  ```

#### 在admin项目里添加子模块

`nest g mo -p admin users`

#### 添加控制器

`nest g co -p admin users`

### 使用CRUD模块实现增删改査接口

`yarn add nestjs-mongoose-crud` 

```
import {Controller} from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {User} from "@libs/db/models/user.model";
import {Crud} from "nestjs-mongoose-crud";

@Crud({
    model: User
})

@Controller('users')
export class UsersController {
    // 注入模型 给 谁
    constructor(@InjectModel(User) private readonly model) {
    }
}
```

## 要写接口文档，安装swagger包和ui包

- `yarn add @nestjs/swagger swagger-ui-express`

- 在main.ts文件进行相关配置

  ```
  import {NestFactory} from '@nestjs/core';
  import {AppModule} from './app.module';
  import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
  
  async function bootstrap() {
      const app = await NestFactory.create(AppModule);
  
      const options = new DocumentBuilder()
          .setTitle('后台管理API')
          .setDescription('供后台管理界面调用的API')
          .setVersion('1.0')
          .build();
      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('api-docs', app, document);
  
      await app.listen(3000);
      console.log("http://localhost:3000/api-docs")
  
  
  }
  
  bootstrap();
  
  ```

- 都是给swagger写接口文档使用

  - 添加用户组-在controller.ts文件中添加@ApiTags('用户')

  - 添加接口描述和示例

    ```
        @ApiProperty({
            description: '用户名',
            example: 'user'
        })
        @prop()
        username: string
    ```

### 给存入数据库的数据添加创建时间和更新时间

- 在模型文件中加入

  ```
  import {modelOptions, prop} from "@typegoose/typegoose";
  @modelOptions({
      schemaOptions: {
          timestamps: true
      }
  })
  ```

### 创建课程模型(模型命名习惯用单数，模块控制器习惯用复数)

- 实现一对多的关联

  ```
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
  
  ```

  ```
  import {modelOptions, prop} from "@typegoose/typegoose";
  
  @modelOptions({
      schemaOptions: {
          timestamps: true
      }
  })
  
  export class Episode {
  
      @prop()
      name: string
  
      @prop()
      file: string
  }
  
  ```

- 创建课程模块`nest g mo -p admin courses`

- 创建课程模块控制器`nest g co -p admin courses`

- 创建课时模块`nest g mo -p admin episodes`

- 创建课时模块控制器`nest g co -p admin episodes`

- 在数据库模块引入新建的模型

  ```
  // courses.controller.ts
  import {Controller} from '@nestjs/common';
  import {Crud} from "nestjs-mongoose-crud";
  import {Course} from "@libs/db/models/course.model";
  import {ApiTags} from "@nestjs/swagger";
  import {InjectModel} from "nestjs-typegoose";
  import {ReturnModelType} from "@typegoose/typegoose";
  
  @Crud({
      model: Course
  })
  @Controller('courses')
  @ApiTags('课程')
  export class CoursesController {
      constructor(@InjectModel(Course) private readonly model: ReturnModelType<typeof Course>) {
      }
  }
  ```

  ```
  // episodes.controller.ts
  import {Controller} from '@nestjs/common';
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
  }
  
  ```

## admin后台管理(TS开发)

#### 回到server同级目录

- 创建admin项目`vue create admin` 选择默认

#### 使用ts开发项目

- 添加element
  
- vue add typescript  // 一路默认
  
- 添加路由

  - vue add router  // 先不使用history模式

- 将项目转成TS项目

  - vue add typescript

    - 默认下去

  - main.ts文件修改

    ```
    import './plugins/element.ts'  // 把element.js替换成element.ts
    ```

    

- [vue-class-component](https://github.com/vuejs/vue-class-component)   `@Component 修饰符注明了此类为一个 Vue 组件`

  ```
  import Vue from 'vue'
  import Component from 'vue-class-component'
  
  // @Component 修饰符注明了此类为一个 Vue 组件
  @Component({
    // 所有的组件选项都可以放在这里
    template: '<button @click="onClick">Click!</button>'
  })
  export default class MyComponent extends Vue {
    // 初始数据可以直接声明为实例的 property
    message: string = 'Hello!'
  
    // 组件方法也可以直接声明为实例的方法
    onClick (): void {
      window.alert(this.message)
    }
  }
  ```

- 添加路由的ts提示

  ```
  const routes: RouteConfig[] // 添加类型定义
  ```

#### 课程管理

- 安装axios

  ```
  yarn add axios @types/axios
  
  //前面 axios 后面代码提示
  ```

- 解决跨域

  ```
  //服务的main.ts加入
  app.enableCors();
  ```


### 引入axios创建全局方法

- 声明.d.ts文件

  ```
  import {AxiosInstance} from 'axios'
  
  declare module 'vue/types/vue' {
      interface Vue {
          $http: AxiosInstance
      }
  }
  
  ```

- 创建全局方法

  ```
  Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3000'
  })
  ```

### 动态生成表单组件(可直接用element的也可以自己封装)

`vue-ele-form`

### 给`<router-view :key="$router.path"></router-view>`加一个唯一key,以防同一组件显示不同的内容时，数据不会刷新

- 可使用uuid库，使用uuid.v4()获取一个随机值

### 表单CRUD组件

S 



### 快捷生成ts模板

```
vts 

<template>
    <div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class $value$ extends Vue {
    }

</script>

<style>
</style>

```

