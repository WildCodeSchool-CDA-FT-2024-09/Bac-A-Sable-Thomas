import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";
import { Repo } from "../repos/repos.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Language extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  // @Field(() => [Repo], { nullable: true })
  @ManyToMany(() => Repo, (repo) => repo.languages)
  repos?: Repo[];
}
