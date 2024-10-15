import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Repo } from "../repos/repos.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Repo)
  @ManyToOne(() => Repo, (repo) => repo.comments)
  repo: Repo;
}
