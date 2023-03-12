import { Router } from "express";
import { addDelete, addUser, getAllRecover, getRecover, getStats } from "../controllers/addUser.js";
import {verifyTokenAdmin, verifyTokenEtAUthorisation}  from "./verifyToken.js";

const router = Router();


router.put('/:id', verifyTokenEtAUthorisation, addUser)
router.delete('/find/:id', verifyTokenEtAUthorisation, addDelete )
router.get('/find/:id', verifyTokenAdmin, getRecover )
router.get('/', verifyTokenAdmin, getAllRecover )
router.get('/stats', verifyTokenAdmin, getStats )

export default router;