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

import Manufacturer from "../manufacturer/manufacturer.model";
import Vendor from "./vendor.model";

@Table({ tableName: "vendor_manufacturer", initialAutoIncrement: "1000" })
class VendorManufacturer extends Model {
  @ForeignKey(() => Manufacturer)
  @Column
  manufacture_id: number;

  @ForeignKey(() => Vendor)
  @Column
  vendor_id: number;
  //
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}

export default VendorManufacturer;
