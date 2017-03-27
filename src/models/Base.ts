import {
  AbstractEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import {Safe} from './Safe';

@AbstractEntity()
export class Base {

  @PrimaryGeneratedColumn()
  id: number;

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

  copy() {
    return JSON.parse(JSON.stringify(this));
  }



}
