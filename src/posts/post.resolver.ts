import {  Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { BaseResolver } from 'src/base/base.resolver';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType('createUpdateInput')
export class CreateUserInput {
  @Field()
  title: string;

  @Field({nullable: true})
  authorId: number
}
@InputType('updatePostInput')
export class UpdateUserInput extends PartialType(CreateUserInput)  {
  @Field(() => Int)
  id: number;
}

@Resolver((of) => Post)
export class PostResolver extends BaseResolver(
    Post,
    UpdateUserInput,
    CreateUserInput,
  ) {
    constructor(private readonly postService: PostService) {
      super(postService);
    }
  }