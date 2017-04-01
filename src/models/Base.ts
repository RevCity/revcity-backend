import {
  AbstractEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";

@AbstractEntity()
export class Base {

  @Column("date")
  createdAt: Date;

  @Column("date")
  updatedAt: Date;

  @BeforeInsert()
  setTimestamps() : void {
    this.createdAt = this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateTimestamps() : void {
    this.updatedAt = new Date();
  }

}
