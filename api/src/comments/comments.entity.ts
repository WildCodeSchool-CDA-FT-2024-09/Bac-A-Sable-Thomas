import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Repo } from "../repos/repos.entity";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  text: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => Repo, (repo) => repo.comments)
  repo: Repo;
}
