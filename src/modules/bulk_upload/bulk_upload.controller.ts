import { ResponseHelper } from "../../helper/response.common";
import { Response } from "express";
import MyRequest from "../../types/Request";
import base64ToCsv from "../../functions/base64ToCsv";
import Manufacturer from "../manufacturer/manufacturer.model";
import Category from "../category/category.model";
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
      var category_data = {
        category_level: "",
        category_name: "",
        category_description: "",
        sorting: 0,
        category_image_url: "",
        comment: "",
        parent_id: "",
        parent_name: "",
        status: "1",
      };
      //
      var j = 0;
      for (let i = 0; i < (arrayData.length - 2) / 8; i++) {
        category_data.category_name = arrayData[j++];
        category_data.status = arrayData[j++];
        category_data.comment = arrayData[j++];
        category_data.category_level = arrayData[j++];
        category_data.category_description = arrayData[j++];
        category_data.sorting = +arrayData[j++];
        category_data.category_image_url = arrayData[j++];
        category_data.parent_name = arrayData[j++];
        //
        if (category_data.category_level == "Sub Level") {
          const sub_level = await Category.findOne({
            raw: true,
            where: {
              category_name: category_data.parent_name,
              category_level: "Parent Level",
            },
          });
          //
          if (sub_level == null) {
            await Category.create({
              category_name: category_data.parent_name,
              category_level: "Parent Level",
              category_description: "",
              sorting: 0,
              category_image_url: "",
              comment: "",
              status: "true",
            });
          }
          //
        }
      }
      //
      var j = 0;
      for (let i = 0; i < (arrayData.length - 2) / 8; i++) {
        category_data.category_name = arrayData[j++];
        category_data.status = arrayData[j++];
        category_data.comment = arrayData[j++];
        category_data.category_level = arrayData[j++];
        category_data.category_description = arrayData[j++];
        category_data.sorting = +arrayData[j++];
        category_data.category_image_url = arrayData[j++];
        category_data.parent_name = arrayData[j++];

        //
        if (category_data.category_level == "Sub Level") {
          const parent_name = category_data.parent_name;
          //
          const parent_category = await Category.findOne({
            raw: true,
            where: { category_name: parent_name },
          });
          //
          const doesExists = await Category.findOne({
            raw: true,
            where: { category_name: category_data.category_name },
          });
          //
          if (doesExists) {
            await Category.update(
              {
                ...category_data,
                parent_id: parent_category?.id.toString(),
              },
              {
                where: {
                  id: doesExists.id,
                },
              }
            );
          } else {
            await Category.create({
              ...category_data,
              parent_id: parent_category?.id.toString(),
            });
          }

          //
        }
        //
      }
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
      var j = 0;
      for (let i = 0; i < arrayData.length / 4 - 1; i++) {}
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
        //
        const manufacturer_response = await Manufacturer.findOne({
          raw: true,
          where: { manufacturer_name: manufacturer_data.manufacturer_name },
        });
        //
        if (manufacturer_response != null) {
          await Manufacturer.update(
            { ...manufacturer_data },
            {
              where: { manufacturer_name: manufacturer_data.manufacturer_name },
            }
          );
        } else {
          await Manufacturer.create({ ...manufacturer_data });
        }
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
