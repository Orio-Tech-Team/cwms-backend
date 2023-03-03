import { Response } from "express";
import { ResponseHelper } from "../../helper/response.common";
import MyRequest from "../../types/Request";
import InvSkuModule from "./inv_sku.module";
//
export default class InventorySKUController {
  static async create(req: MyRequest, res: Response) {}
  //
  static async find_all(req: MyRequest, res: Response) {
    try {
      const response = await InvSkuModule.find(
        req.user_information!.acc_no,
        req.user_information!.loc_no
      );
      return ResponseHelper.get(res, 200, "Success", response);
    } catch (err) {
      return ResponseHelper.get(res, 200, err, []);
    }
  }
}
