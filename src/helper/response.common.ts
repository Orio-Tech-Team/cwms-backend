import { Response } from "express";

export class ResponseHelper {
  static async get(res: Response, status: number, message: string, data: any) {
    return res.json({
      status: status,
      message: message,
      data: data,
    });
  }
}
