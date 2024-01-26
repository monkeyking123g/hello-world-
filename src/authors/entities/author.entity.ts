import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName?: string;

  @OneToMany(() => Post, post => post.author)
  @Field((type) => [Post], { nullable: true })
  posts: Post[];
}
