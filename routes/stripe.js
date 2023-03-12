import { Router } from "express";
import { addStripe } from "../controllers/addStripe.js";

const router = Router();

router.post('/payment', addStripe)


export default router;