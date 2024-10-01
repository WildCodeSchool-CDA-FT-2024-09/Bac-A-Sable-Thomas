import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  Check,
  Unique,
} from "typeorm";
import { Min, Max, IsString } from "class-validator";

@Entity()
@Unique(["id"])
@Check(`"is_private" IN (1, 2)`)
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

  @Column()
  @Min(1)
  @Max(2)
  is_private: number;
}
