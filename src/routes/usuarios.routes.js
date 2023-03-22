import { Router } from "express"
import getUsuarios from "../controllers/usuarios.controller"

const router = Router()

router.get('/usuarios', getUsuarios)

export default router