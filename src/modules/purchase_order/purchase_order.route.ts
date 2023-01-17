import express, { Router } from "express";
import {
  approve,
  cancel,
  create,
  findAll,
  receive,
} from "./purchase_order.controller";
const router: Router = express.Router();
//
router.post("/approve/", approve);
router.post("/cancel/", cancel);
router.post("/receive/", receive);
router.get("/find_all/", findAll);
router.post("/create/", create);
//
export default router;
