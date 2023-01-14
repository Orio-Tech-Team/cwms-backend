import Category from "./category.model";
import { Request, Response } from "express";
import CategoryDTO from "./dto/category.dto";
import Product from "../product/product.model";
//
export const create = async (req: Request, res: Response) => {
  const category_dto: CategoryDTO = req.body;
  try {
    const category = await Category.create(category_dto);

    return res.json({
      message: "Success",
      status: 200,
      data: [category],
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
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const category = await Category.findAll({
      include: [Product],
      attributes: { exclude: ["created_at", "updated_at"] },
    });
    return res.json({
      message: "Success",
      data: category,
      status: 200,
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
//
export const find = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const category = await Category.findOne({
      where: { id },
    });
    return res.json({
      message: "Success",
      data: category,
      status: 200,
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

export const update = async (req: Request, res: Response) => {
  const category_dto: CategoryDTO = req.body;
  const { id } = req.body;
  try {
    await Category.update(category_dto, {
      where: { id },
    });
    return {
      message: "Success",
      data: [id],
      status: 200,
    };
  } catch (err: any) {
    console.error(err);
    return res.json({
      message: err.message,
      status: 500,
      data: [],
    });
  }
};
