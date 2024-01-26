import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm'

@ObjectType()
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string;

  @Field((type) => Post)
  @ManyToOne(() => Author, (author) => author.posts)
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column({ nullable: true })
  authorId: number;
}
