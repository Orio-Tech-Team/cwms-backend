import {
  create,
  findAll,
  find,
  update,
  findVendorTax,
} from "./vendor.controller";
import express, { Router } from "express";
const router: Router = express.Router();
//
router.post("/create/", create);
router.post("/update/", update);
router.post("/find/", find);
router.get("/find_all/", findAll);
router.get("/find_vendor_tax/", findVendorTax);
//
export default router;
