import {  Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Author } from './entities/author.entity';
import { AuthorService } from './author.service';
import { BaseResolver } from 'src/base/base.resolver';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { PostService } from 'src/posts/post.service';

@InputType('createUserInput')
export class CreateUserInput {
  @Field({ description: 'Firstname of user' })
  firstName: string;

  @Field({ description: 'Surname of user' })
  lastName: string;
}
@InputType('updateUserInput')
export class UpdateUserInput extends PartialType(CreateUserInput)  {
  @Field(() => Int)
  id: number;
}

@Resolver((of) => Author)
export class AuthorResolver extends BaseResolver(
    Author,
    UpdateUserInput,
    CreateUserInput,
  ) {
    constructor(private readonly authorService: AuthorService,
      private readonly postService: PostService ) {
      super(authorService);
    }

    @ResolveField((returns) => [Post])
    async posts(@Parent() author: Author): Promise<Post[]> {
      return this.postService.findPostsByAuthorId(author.id);
    }
  }
  