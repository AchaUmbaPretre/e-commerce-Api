import { Router } from "express";
import { addCart, cartAllGet, cartDelete, cartGet, cartPut } from "../controllers/addCart.js";
import { verifyToken, verifyTokenAdmin, verifyTokenEtAUthorisation } from "./verifyToken.js";

const router = Router();

router.post('/', verifyToken, addCart )
router.put('/:id', verifyTokenEtAUthorisation, cartPut )
router.delete('/:id', verifyTokenEtAUthorisation, cartDelete )
router.get('/find/:userId', verifyTokenEtAUthorisation, cartGet )
router.get('/', verifyTokenAdmin, cartAllGet )


export default router;