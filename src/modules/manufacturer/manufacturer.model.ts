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
  HasOne,
} from "sequelize-typescript";
import ManufacturerDTO from "./dto/manufacturer.dto";
//
@Table({ tableName: "manufacturers", initialAutoIncrement: "1000" })
class Manufacturer extends Model<ManufacturerDTO> {
  @Column
  manufacturer_name: string;

  @Column
  line_of_business: string;
  //
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Column({ allowNull: false, defaultValue: false })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}

export default Manufacturer;
