import {
  create,
  findAll,
  update,
  find,
  findForDataTable,
} from "./product.controller";
import express, { Router } from "express";
const router: Router = express.Router();
//
router.post("/create/", create);
router.post("/update/", update);
router.post("/find/", find);
router.get("/find_all/", findAll);
router.get("/find_for_dt/", findForDataTable);
//
export default router;
