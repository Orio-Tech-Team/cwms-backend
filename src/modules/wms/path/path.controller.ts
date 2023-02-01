import { ResponseHelper } from "../../../helper/response.common";
import { Request, Response } from "express";
import PathDTO from "./dto/path.dto";
import Path from "./path.model";
//
export const find_all = async (req: Request, res: Response) => {
  try {
    const response: PathDTO[] = await Path.findAll();
    return ResponseHelper.get(res, 200, "Success", response);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err, []);
  }
};
//
