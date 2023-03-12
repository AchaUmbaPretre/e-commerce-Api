import { Router } from "express";
import { addProduct, productAllGet, productDelete, productGet, productPut } from "../controllers/addProduct.js";
import {verifyTokenAdmin, verifyTokenEtAUthorisation} from "./verifyToken.js";

const router = Router();


router.post('/', verifyTokenAdmin, addProduct )
router.put('/:id', verifyTokenAdmin, productPut )
router.delete('/:id', verifyTokenAdmin, productDelete )
router.get('/find/:id', productGet )
router.get('/', productAllGet )


export default router;