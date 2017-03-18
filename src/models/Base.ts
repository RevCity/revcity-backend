import {
  AbstractEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";

@AbstractEntity()
export class Base {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  createdAt: number;

  @Column("int")
  updatedAt: number;

  @BeforeInsert()
  setTimestamps() : void {
    this.createdAt = this.updatedAt = new Date().getTime()
  }

  @BeforeUpdate()
  updateTimestamps() : void {
    this.updatedAt = new Date().getTime();
  }

}
