import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Category from "./modules/category/category.model";
import Customer from "./modules/customer/customer.model";
import User from "./modules/user/user.model";
import Manufacturer from "./modules/manufacturer/manufacturer.model";
import Vendor from "./modules/vendor/vendor.model";
import Product from "./modules/product/product.model";
import ProductCategory from "./modules/product/product-category.model";
import ProductConversion from "./modules/product/product-conversion.model";
import ProductGenericFormula from "./modules/product/product-generic_formula.model";
import ProductTag from "./modules/product/product-tag.model";
import ProductVendor from "./modules/product/product-vendor.model";
import VendorManufacturer from "./modules/vendor/vendor-manufacturer.model";
import VendorTax from "./modules/vendor/vendor-tax.model";
dotenv.config();
//
const sequelize: Sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [
    Customer,
    User,
    Category,
    Manufacturer,
    Vendor,
    VendorTax,
    VendorManufacturer,
    Product,
    ProductCategory,
    ProductConversion,
    ProductGenericFormula,
    ProductTag,
    ProductVendor,
  ],
});

export default sequelize;
