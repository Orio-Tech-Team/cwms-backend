import { ResponseHelper } from "../../helper/response.common";
import { Response } from "express";
import MyRequest from "../../types/Request";
//
export default class BulkUpload {
  static async product_upload(req: MyRequest, res: Response) {
    return ResponseHelper.get(res, 200, "Success", []);
  }
  //
  static async category_upload(req: MyRequest, res: Response) {
    return ResponseHelper.get(res, 200, "Success", []);
  }
  //
  static async vendor_upload(req: MyRequest, res: Response) {
    return ResponseHelper.get(res, 200, "Success", []);
  }
  //
  static async manufacturer_upload(req: MyRequest, res: Response) {
    return ResponseHelper.get(res, 200, "Success", []);
  }
  //
}
