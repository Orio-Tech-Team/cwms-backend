import PurchaseOrderDetailDTO from "./dto/purchase_order-detail.dto";
import PurchaseOrderDetail from "./purchase_order-detail.model";
import PurchaseOrderDTO from "./dto/purchase_order.dto";
import PurchaseOrder from "./purchase_order.model";
//
import { ResponseHelper } from "../../helper/response.common";
import { Request, Response } from "express";
//
export const create = async (req: Request, res: Response) => {
  const purchase_order_data: PurchaseOrderDTO = req.body;
  const { orders }: { orders: any[] } = req.body;
  //
  try {
    const purchase_order = await PurchaseOrder.create({
      ...purchase_order_data,
      order_status:
        purchase_order_data.net_amount <= 5000 ? "Approved" : "Pending",
    });
    //
    const forBulkCreation: any[] = orders.map(
      (each_item: PurchaseOrderDetailDTO) => {
        return {
          po_id: purchase_order.id,
          product_id: each_item.product_id,
          product_name: each_item.product_name,
          manufacturer_id: each_item.manufacturer_id,
          manufacturer_name: each_item.manufacturer_name,
          required_quantity: each_item.required_quantity,
          trade_price: each_item.trade_price,
          sales_tax_percentage: each_item.sales_tax_percentage,
          trade_discount_percentage: each_item.trade_discount_percentage,
          gst_percentage: each_item.gst_percentage,
          foc: each_item.foc,
          item_conversion: each_item.item_conversion,
          uom: each_item.uom,
        };
      }
    );
    const purchase_order_detail = await PurchaseOrderDetail.bulkCreate(
      forBulkCreation
    );
    //
    return ResponseHelper.get(res, 200, "Success", [
      {
        ...purchase_order,
        details: purchase_order_detail,
      },
    ]);
    //
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
  //
};
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const purchase_order = await PurchaseOrder.findAll({
      include: [PurchaseOrderDetail],
    });

    return ResponseHelper.get(res, 200, "Success", purchase_order);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const receive = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const purchase_order = await PurchaseOrder.update(
      {
        order_status: "Received",
        arrival_date: new Date(),
      },
      {
        where: { id },
      }
    );
    return ResponseHelper.get(res, 200, "Success", purchase_order);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const approve = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const purchase_order = await PurchaseOrder.update(
      {
        order_status: "Approved",
      },
      {
        where: { id },
      }
    );
    return ResponseHelper.get(res, 200, "Success", purchase_order);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const cancel = async (req: Request, res: Response) => {
  const { id, comment } = req.body;
  try {
    const purchase_order = await PurchaseOrder.update(
      {
        order_status: "Canceled",
        is_cancelled: true,
        comment: comment,
      },
      {
        where: { id },
      }
    );
    return ResponseHelper.get(res, 200, "Success", purchase_order);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
