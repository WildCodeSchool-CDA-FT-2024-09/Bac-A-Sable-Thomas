import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Repo } from "../repos/repos.entity";

@Entity()
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @OneToMany(() => Repo, (repo) => repo.status)
  repos?: Repo[];
}
