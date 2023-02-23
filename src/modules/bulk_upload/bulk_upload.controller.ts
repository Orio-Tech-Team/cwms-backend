import { ResponseHelper } from "../../helper/response.common";
import { Response } from "express";
import MyRequest from "../../types/Request";
import base64ToCsv from "../../functions/base64ToCsv";
//
export default class BulkUpload {
  static csvChecker(csv: string | null) {
    if (!csv) {
      throw new Error("Missing base64-encoded CSV data in request body");
    }
  }
  //
  static async product_upload(req: MyRequest, res: Response) {
    try {
      const { csv } = req.body;
      BulkUpload.csvChecker(csv);
      //
      const arrayData = base64ToCsv(csv, "product");
      //
      arrayData.forEach((each_data) => {
        if (each_data) console.log(each_data);
      });
      //
      return ResponseHelper.get(res, 200, "Success", []);
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
  //
  static async category_upload(req: MyRequest, res: Response) {
    try {
      const { csv } = req.body;
      BulkUpload.csvChecker(csv);
      //
      const arrayData = base64ToCsv(csv, "category");
      //
      arrayData.forEach((each_data) => {
        if (each_data) console.log(each_data);
      });
      //
      return ResponseHelper.get(res, 200, "Success", []);
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
  //
  static async vendor_upload(req: MyRequest, res: Response) {
    try {
      const { csv } = req.body;
      BulkUpload.csvChecker(csv);
      //
      const arrayData = base64ToCsv(csv, "vendor");
      //
      arrayData.forEach((each_data) => {
        if (each_data) console.log(each_data);
      });
      //
      return ResponseHelper.get(res, 200, "Success", []);
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
  //
  static async manufacturer_upload(req: MyRequest, res: Response) {
    try {
      const { csv } = req.body;
      BulkUpload.csvChecker(csv);
      //
      const arrayData = base64ToCsv(csv, "manufacturer");
      //
      var manufacturer_data = {
        manufacturer_name: "",
        status: "",
        comment: "",
        line_of_business: "",
      };
      //
      var j = 0;
      for (let i = 0; i < arrayData.length / 4 - 1; i++) {
        manufacturer_data.manufacturer_name = arrayData[j++];
        manufacturer_data.status = arrayData[j++];
        manufacturer_data.comment = arrayData[j++];
        manufacturer_data.line_of_business = `["${arrayData[j++]}"]`;
        console.log(manufacturer_data);
      }
      //

      //
      return ResponseHelper.get(res, 200, "Success", []);
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
  //
}
