import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Category from "./modules/category/category.model";
import Customer from "./modules/customer/customer.model";
import User from "./modules/user/user.model";
import Manufacturer from "./modules/manufacturer/manufacturer.model";
dotenv.config();
//
const sequelize: Sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [Category, Customer, User, Manufacturer],
});

export default sequelize;
