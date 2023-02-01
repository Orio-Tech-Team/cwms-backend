import { Response } from "express";

export class ResponseHelper {
  static async get(res: Response, status: number, info: any, data: any) {
    if (status == 500) {
      console.log(info.message);
      console.log(info.stack);
      return res.json({
        status,
        message: info.message,
        info,
      });
    }
    return res.json({
      status: status,
      message: info,
      data: data,
    });
  }
}
