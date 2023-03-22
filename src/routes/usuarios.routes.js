import { Router } from 'express'
import { postUsuarios} from '../routes/usuarios.routes.js'

const router = Router()

router.post('/usuarios', postUsuarios)

export default router