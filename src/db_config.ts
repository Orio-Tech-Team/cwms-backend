import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Category from "./modules/category/category.model";
dotenv.config();
//
const sequelize: Sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [Category],
});

export default sequelize;
