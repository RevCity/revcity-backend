import {createConnection} from "typeorm";
import * as dotenv from "dotenv";
/* Establishes environment variables */
dotenv.config();

/* Connection spec */
let conn = createConnection({
  driver: {
    type:     "mysql",
    host:     process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
  },
  entities: [
    __dirname + "/../models/*.js"
  ],
  autoSchemaSync: true,
});

/* Exports the connection */
export default conn;
