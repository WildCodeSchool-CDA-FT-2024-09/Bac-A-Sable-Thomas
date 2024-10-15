import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Repo } from "../repos/repos.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => [Repo], { nullable: true })
  @OneToMany(() => Repo, (repo) => repo.status)
  repos?: Repo[];
}
