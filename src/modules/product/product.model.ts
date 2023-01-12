import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import ProductDTO from "./dto/product.dto";
@Table({ tableName: "products", initialAutoIncrement: "1000" })
class Product extends Model<ProductDTO> {}
