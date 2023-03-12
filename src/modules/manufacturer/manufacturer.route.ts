import {
  create,
  findAll,
  find,
  update,
  findForDataTable,
} from "./manufacturer.controller";
import express, { Router } from "express";
const router: Router = express.Router();
//
router.post("/create/", create);
router.post("/update/", update);
router.post("/find/", find);
router.get("/find_for_dt/", findForDataTable);
router.get("/find_all/", findAll);
//
export default router;
