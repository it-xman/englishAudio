# 前端全栈开发

## 开发步骤 1

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

  

## admin后台管理（server 同级）

`vue create admin`

- 使用ts开发vue
- 加入element组件 `vue add element`
- 加入路由`vue add router`
- 转ts项目`vue add typescript`

