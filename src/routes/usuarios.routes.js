import { Router } from 'express'
import { postUsuarios} from '../routes/usuarios.routes'

const router = Router()

router.post('/usuarios', postUsuarios)

export default router