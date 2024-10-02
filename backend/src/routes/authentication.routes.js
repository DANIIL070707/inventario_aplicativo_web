import { Router } from "express";
import { registroUsuario, login, generarCodigo, verificarCodigo, cambioContrasena
    ,traerDatosUsuario
} from "../controllers/authenticationController.js";
const router = Router()


router.post('/login', login ) 
router.post('/register', registroUsuario ) 
router.post('/generarCodigo', generarCodigo)
router.post('/verificarCodigo', verificarCodigo)
router.post('/cambioContrasena', cambioContrasena)
router.post('/traerDatosUsuarios', traerDatosUsuario)


export default router