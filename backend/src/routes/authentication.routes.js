import { Router } from "express";
import { registroUsuario, login, generarCodigo, verificarCodigo, cambioContrasena} from "../controllers/authenticationController.js";
const router = Router()


router.post('/login', login ) 
router.post('/register', registroUsuario ) 
router.post('/generarCodigo', generarCodigo)
router.post('/verificarCodigo', verificarCodigo)
router.post('/cambioContrasena', cambioContrasena)


export default router