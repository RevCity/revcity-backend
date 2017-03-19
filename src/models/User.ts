import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {Base} from "./Base";
import {Constants} from "../utils/Constants";

@Entity("users")
export class User extends Base {

  @Column("string")
  facebookId: string;

  @Column("string")
  googleId: string;

  @Column("string")
  email: string;

  @Column("string")
  firstName: string;

  @Column("string")
  lastName: string;

  @Column("string")
  imageUrl: string;

  @Column("int")
  phone: number;

  @Column("date")
  birthday: Date;

  @Column("string", { length: 1 })
  gender: string // 'm' = male, 'f' = female, 'o' = other


  setGender(gender : string) : void {
    switch(gender) {
      case "female":
        this.gender = Constants.FEMALE;
        break;
      case "male":
        this.gender = Constants.MALE;
        break;
      case "other":
        this.gender = Constants.OTHER;
        break;
      default:
        throw new Error("Unrecognized gender expression");
    }
  }


}
