import Category from "./category.model";
import { Request, Response } from "express";
import CategoryDTO from "./dto/category.dto";
import Product from "../product/product.model";
import { ResponseHelper } from "../../helper/response.common";
//
export const create = async (req: Request, res: Response) => {
  const category_dto: CategoryDTO = req.body;
  try {
    const category = await Category.create(category_dto);
    return ResponseHelper.get(res, 200, "Success", [category]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const category = await Category.findAll({
      include: [Product],
    });
    //
    var parent_categories: any[] = [];
    var child_categories: any[] = [];
    category.forEach((each_category: any) => {
      if (each_category.parent_id == null) {
        parent_categories.push(each_category);
      } else {
        child_categories.push(each_category);
      }
    });
    //

    var data_to_send: any[] = [];
    parent_categories.forEach((each_parent: any) => {
      var child_categories_temp: any[] = [];
      child_categories.forEach((each_child: any) => {
        if (each_parent.id == each_child.parent_id) {
          child_categories_temp.push(each_child);
        }
      });
      data_to_send.push({
        id: each_parent.id,
        category_level: each_parent.category_level,
        category_name: each_parent.category_name,
        category_description: each_parent.category_description,
        sorting: each_parent.sorting,
        category_image_url: each_parent.category_image_url,
        parent_id: null,
        status: each_parent.status,
        products: each_parent.products,
        created_at: each_parent.created_at,
        updated_at: each_parent.updated_at,
        child: child_categories_temp,
      });
    });

    //
    return ResponseHelper.get(res, 200, "Success", data_to_send);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const find = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const category = await Category.findOne({
      where: { id },
    });
    return ResponseHelper.get(res, 200, "Success", [category]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};

export const update = async (req: Request, res: Response) => {
  const category_dto: CategoryDTO = req.body;

  try {
    await Category.update(category_dto, {
      where: { id: category_dto.id },
    });
    return ResponseHelper.get(res, 200, "Success", [category_dto]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
