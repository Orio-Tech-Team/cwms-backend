import { GrnType } from "../grn/dto/grn.type";
import InventorySku from "./entities/InventorySKU.entity";

export default class InvSkuModule {
  static async create(
    data: GrnType,
    account_number: string,
    location_id: string
  ) {
    InventorySku.create({
      po_id: data.po_id,
      product_id: data.product_id,
      product_name: data.product_name,
      required_quantity: data.required_quantity.toString(),
      received_quantity: data.received_quantity.toString(),
      maximum_retail_price: data.maximum_retail_price,
      trade_price: data.trade_price,
      discount_percentage: data.discount_percentage.toString(),
      batch_number: data.batch_number,
      batch_expiry: data.batch_expiry,
      comments: data.comments,
      foc: data.foc,
      uom: data.uom,
      location_id: location_id,
      account_number: account_number,
      status: true,
    });
  }
  //
  static async find(account_number: string, location_id: string) {
    return await InventorySku.findAll({
      raw: true,
      where: {
        account_number,
        location_id,
      },
    });
  }
}
