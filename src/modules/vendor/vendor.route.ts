import { create, findAll, find, update } from "./vendor.controller";
import express, { Router } from "express";
const router: Router = express.Router();
//
router.post("/create/", create);
router.post("/update/", update);
router.post("/find/", find);
router.get("/find_all/", findAll);
//
export default router;
