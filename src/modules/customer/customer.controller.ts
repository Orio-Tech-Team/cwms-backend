import { Request, Response } from "express";
import Customer from "./customer.model";
import CustomerDTO from "./dto/customer.dto";
//
export const create = async (req: Request, res: Response) => {
  const customer_data: CustomerDTO = req.body;
  try {
    const last_customer = await Customer.findAll({
      order: [["created_at", "DESC"]],
    });
    var account_number = "";
    if (last_customer.length > 0) {
      const last_customer_id: any = last_customer[0].id;
      account_number = `${customer_data.city}-WMS-${+last_customer_id + 1}`;
    } else {
      account_number = `${customer_data.city}-WMS-1000`;
    }
    const customer = await Customer.create({
      ...customer_data,
      account_number: account_number,
    });

    return res.json({
      message: "Success",
      status: 200,
      data: [customer],
    });
  } catch (err: any) {
    console.error(err);
    return res.json({
      message: err.message,
      status: 500,
      data: [],
    });
  }
};
