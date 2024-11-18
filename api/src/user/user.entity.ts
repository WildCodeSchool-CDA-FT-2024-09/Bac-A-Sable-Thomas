import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Column()
  password: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  role: string;
}
