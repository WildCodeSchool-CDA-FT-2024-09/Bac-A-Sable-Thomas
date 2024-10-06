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

@Entity()
@Unique(["id"])
export class Repo extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  url: string;

  @ManyToOne(() => Status, (status) => status.repos)
  status: Status;

  @OneToMany(() => Comment, (comment) => comment.repo)
  comments?: Comment[];

  @ManyToMany(() => Language, (language) => language.repos)
  @JoinTable()
  languages?: Language[];
}
