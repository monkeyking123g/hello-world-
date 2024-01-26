import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService extends BaseService(Post, this) {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
      ) {
        super()
      }
    async findPostsByAuthorId (id: number) {
        return this.postRepository.find({relations: {
            author: true
        }, where: {authorId: id}})       
    }
}
