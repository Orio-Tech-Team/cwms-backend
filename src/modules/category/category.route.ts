import { create, findAll, find, update } from "./category.controller";
import { Router } from "express";
const router = Router();
//
router.post("/create/", create);
router.get("/find_all/", findAll);
router.post("/find/", find);
router.post("/update/", update);
//
export default router;
