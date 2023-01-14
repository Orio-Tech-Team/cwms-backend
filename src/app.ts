import express, { Application } from "express";
import errorHandler from "./middleware.ts/error.middleware";
import bodyParser from "body-parser";
import sequelize from "./db_config";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
//
dotenv.config();
const app: Application = express();
//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    limit: "10mb",
  })
);
//
//

import CategoryRoutes from "./modules/category/category.route";
import CustomerRoutes from "./modules/customer/customer.route";
import UserRoutes from "./modules/user/user.route";
import ManufacturerRoutes from "./modules/manufacturer/manufacturer.route";
import VendorRoutes from "./modules/vendor/vendor.route";
import ProductRoutes from "./modules/product/product.route";
//
app.use("/api/category/", CategoryRoutes);
app.use("/api/customer/", CustomerRoutes);
app.use("/api/user/", UserRoutes);
app.use("/api/manufacturer/", ManufacturerRoutes);
app.use("/api/vendor/", VendorRoutes);
app.use("/api/product/", ProductRoutes);

//
const port: number = +process.env.PORT! || 3001;
//
app.use(errorHandler);
//
app.listen(port, function () {
  // sequelize.sync({ force: true }).then(() => {
  //   console.log("Database Synced!");
  // });
  //
  // sequelize.sync({ alter: true }).then(() => {
  //   console.log("Database Synced!");
  // });
  //
  sequelize.authenticate();
  console.log("Database Connected!");
  console.log(`App is listening on port ${port} !`);
});
