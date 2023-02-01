import { find_all } from "./path.controller";
import { Router } from "express";
const router = Router();
//
router.get("/find_all/", find_all);
//
export default router;
