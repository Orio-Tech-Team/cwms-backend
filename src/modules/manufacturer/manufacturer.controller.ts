import { Request, Response } from "express";
import Manufacturer from "./manufacturer.model";
import ManufacturerDTO from "./dto/manufacturer.dto";
import { ResponseHelper } from "../../helper/response.common";
//
export const create = async (req: Request, res: Response) => {
  const manufacturer_data: ManufacturerDTO = req.body;
  try {
    const manufacturer = await Manufacturer.create(manufacturer_data);
    return ResponseHelper.get(res, 200, "Success", [manufacturer]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const findAll = async (req: Request, res: Response) => {
  try {
    const manufacturer = await Manufacturer.findAll();
    return ResponseHelper.get(res, 200, "Success", manufacturer);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const find = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const manufacturer = await Manufacturer.findOne({ where: { id } });
    return ResponseHelper.get(res, 200, "Success", [manufacturer]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const update = async (req: Request, res: Response) => {
  const manufacturer_data: ManufacturerDTO = req.body;
  try {
    await Manufacturer.update(manufacturer_data, {
      where: {
        id: manufacturer_data.id,
      },
    });
    return ResponseHelper.get(res, 200, "Success", [manufacturer_data]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};