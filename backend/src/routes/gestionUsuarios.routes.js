import { Router } from "express";
import {getUsuarios, getRoles, updateUser, deleteUser} from '../controllers/gestionUsuariosController.js'

const router = Router()

router.get('/getUsuarios', getUsuarios ) 
router.get('/getRoles', getRoles)
router.put('/updateUser/:idEdit', updateUser)
router.delete('/deleteUser/:idDelete', deleteUser)

export default router;