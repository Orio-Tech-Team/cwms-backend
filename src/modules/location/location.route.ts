import { create, findAll } from "./location.controller";
import express, { Router } from "express";
const router: Router = express.Router();
//
router.post("/create/", create);
router.post("/find_all/", findAll);
//
export default router;
