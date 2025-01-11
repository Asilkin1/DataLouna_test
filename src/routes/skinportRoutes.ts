// Skinport routes

import { Router } from "express";
import { getSkinportData } from "../controllers/skinportController";

const router = Router();
router.get('/skinport', getSkinportData);

export { router as skinportService }