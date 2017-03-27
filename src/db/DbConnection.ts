import {
  Connection,
  getConnectionManager,
  ConnectionOptions
} from "typeorm";
import * as dotenv from "dotenv";

// Establish env variables
dotenv.config();

// Driver properties
let driver = {
  type:     "mysql" as any,
  host:     process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME
};

// Entities
let entities = [
  __dirname + "/../models/*.js"
];

// Auto-sync schema
let autoSchemaSync = true;

let connectionOptions : ConnectionOptions = {
  driver: driver,
  entities: entities,
  autoSchemaSync: autoSchemaSync
};

export default getConnectionManager().createAndConnect(connectionOptions);
