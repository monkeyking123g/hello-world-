import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path'
import { AuthorModule } from './authors/author.module';
import { PostModule } from "./posts/post.module"
import { Author } from './authors/entities/author.entity';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
    type: "mysql",
    host: "mysql",
    port: 3306,
    username: "my_user",
    password: "my_password",
    database: "my_database",
    entities: [Author, Post],
    synchronize: true,
  }),
  AuthorModule,
  PostModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
