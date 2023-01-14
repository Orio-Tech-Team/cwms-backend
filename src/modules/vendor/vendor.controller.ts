import { Request, Response } from "express";
import Vendor from "./vendor.model";
import VendorDTO from "./dto/vendor.dto";
import { ResponseHelper } from "../../helper/response.common";
import Manufacturer from "../manufacturer/manufacturer.model";
import Product from "../product/product.model";
import VendorManufacturer from "./vendor-manufacturer.model";
//
export const create = async (req: Request, res: Response) => {
  const vendor_data: VendorDTO = req.body;
  const { manufacturer }: any = req.body;
  try {
    const vendor = await Vendor.create(vendor_data);
    await vendorManufacturerCreateFunction(manufacturer, vendor.id);
    return ResponseHelper.get(res, 200, "Success", [vendor]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const findAll = async (req: Request, res: Response) => {
  try {
    const vendor = await Vendor.findAll({
      include: [Manufacturer, Product],
    });
    return ResponseHelper.get(res, 200, "Success", vendor);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const find = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const vendor = await Vendor.findOne({
      where: { id },
      include: [Manufacturer, Product],
    });
    return ResponseHelper.get(res, 200, "Success", [vendor]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const update = async (req: Request, res: Response) => {
  const vendor_data: VendorDTO = req.body;
  const { manufacturer }: any = req.body;
  try {
    await Vendor.update(vendor_data, {
      where: {
        id: vendor_data.id,
      },
    });
    await VendorManufacturer.destroy({
      where: {
        vendor_id: vendor_data.id,
      },
    });
    await vendorManufacturerCreateFunction(manufacturer, vendor_data.id);
    return ResponseHelper.get(res, 200, "Success", [vendor_data]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};

const vendorManufacturerCreateFunction = async (
  manufacturer: any[],
  vendor_id: number
) => {
  const vendor_manufacturer_temp = manufacturer.map(
    (each_manufacturer: any) => {
      return {
        manufacturer_id: each_manufacturer,
        vendor_id: vendor_id,
      };
    }
  );
  await VendorManufacturer.bulkCreate(vendor_manufacturer_temp);
};