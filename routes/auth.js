import { Router } from "express";
import { addRegister, login} from "../controllers/addAuth.js";

const router = Router();


router.post('/register',addRegister);
router.post('/login', login);

export default router;