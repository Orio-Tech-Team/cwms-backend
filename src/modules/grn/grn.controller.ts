import { Response, Request } from "express";
import { ResponseHelper } from "../../helper/response.common";
import Grn from "./grn.model";
import GrnDTO from "./dto/grn.dto";
import sequelize from "../../db_config";
//
export const create = async (req: Request, res: Response) => {
  try {
    const { grn_data }: { grn_data: GrnDTO[] } = req.body;
    const {
      po_id,
      percent_order_completed,
    }: { po_id: number; percent_order_completed: number } = req.body;
    //
    const data_to_store = grn_data.map((each_grn: GrnDTO) => {
      return {
        ...each_grn,
        po_id,
        percent_order_completed,
        remaining_quantity:
          each_grn.required_quantity - each_grn.received_quantity,
        is_updatable:
          each_grn.required_quantity - each_grn.received_quantity === 0
            ? false
            : true,
        grn_status:
          each_grn.required_quantity - each_grn.received_quantity === 0
            ? "P"
            : "PR",
      };
    });
    //
    await Grn.bulkCreate(data_to_store);
    //
    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    console.log(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const response = await Grn.findAll();
    return ResponseHelper.get(res, 200, "Success", response);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const find = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const response = await Grn.findOne({
      where: { id },
    });
    return ResponseHelper.get(res, 200, "Success", [response]);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const quality_approve = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await Grn.update(
      {
        qc_approved: true,
      },
      {
        where: { id },
      }
    );
    return ResponseHelper.get(res, 500, "Success", [{ id }]);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const quality_reject = async (req: Request, res: Response) => {
  try {
    const { id, received_quantity, product_id, po_id, required_quantity, foc } =
      req.body;
    const [[count]]: any = await sequelize.query(
      `SELECT count(*) as cnt from grn where product_id=${product_id} and po_id = ${po_id} AND foc = ${foc}`
    );
    //
    const response = await Grn.update(
      {
        is_updatable: true,
        received_quantity: 0,
        required_quantity:
          count.cnt == 1 ? required_quantity : received_quantity,
        remaining_quantity:
          count.cnt == 1 ? required_quantity : received_quantity,
        grn_status: "D",
      },
      {
        where: { id },
      }
    );
    //
    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
