import { Router } from "express";
import {getUsuarios} from '../controllers/gestionUsuariosController.js'

const router = Router()

router.get('/getUsuarios', getUsuarios ) 

export default router;