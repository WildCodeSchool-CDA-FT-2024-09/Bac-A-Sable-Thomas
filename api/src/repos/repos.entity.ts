import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  Unique,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Status } from "../statuses/statuses.entity";
import { Language } from "../languages/languages.entity";
import { Comment } from "../comments/comments.entity";
import { IsString } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
@Unique(["id"])
export class Repo extends BaseEntity {
  // Field = accessible to GraphQL
  @Field()
  @PrimaryColumn()
  @IsString()
  id: string;

  @Field()
  @Column()
  @IsString()
  name: string;

  @Field()
  @Column()
  @IsString()
  url: string;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.repos)
  status: Status;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.repo)
  comments?: Comment[];

  @Field(() => [Language], { nullable: true })
  @ManyToMany(() => Language, (language) => language.repos)
  @JoinTable()
  languages?: Language[];
}

// Example - can add another objecttype to have a more restricted query set
@ObjectType()
export class RepoRestricted extends Repo {
  @Field()
  @PrimaryColumn()
  @IsString()
  id: string;

  @Field()
  @Column()
  @IsString()
  name: string;

  @Field()
  @Column()
  @IsString()
  url: string;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.repos)
  status: Status;
}
