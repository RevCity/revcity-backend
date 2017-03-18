import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {Base} from "./Base";

@Entity("users")
export class User extends Base {

}
