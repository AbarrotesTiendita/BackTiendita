import { Router } from "express"
import getUsuarios from "../controllers/usuarios.controller"
import { login } from "../controllers/login.controllers"
const router = Router()

router.get('/usuarios', getUsuarios)
router.post('/login', login)

export default router