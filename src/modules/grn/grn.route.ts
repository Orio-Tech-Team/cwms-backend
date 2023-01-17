import {
  create,
  find,
  findAll,
  quality_approve,
  quality_reject,
} from "./grn.controller";
import { Router } from "express";
const router: Router = Router();
//
router.post("/create/", create);
router.post("/find/", find);
router.post("/approve/", quality_approve);
router.post("/reject/", quality_reject);
router.get("/find_all/", findAll);
//
export default router;
