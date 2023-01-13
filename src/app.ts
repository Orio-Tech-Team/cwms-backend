import express, { Application, Request, Response } from "express";
import errorHandler from "./middleware.ts/error.middleware";
import bodyParser from "body-parser";
import sequelize from "./db_config";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

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
import CategoryRoutes from "./modules/category/category.route";
//
const swaggerSpec = swaggerJSDoc({
  definition: {
    info: {
      title: "Chickoo Warehouse Management System",
      version: "1.0.0",
    },
  },
  apis: ["./*.ts", "./modules/**/*.*.ts"],
});
//
app.use("/explorer/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api/category/", CategoryRoutes);
//
const port: number = +process.env.PORT! || 3001;
app.use(errorHandler);
app.listen(port, function () {
  //
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
