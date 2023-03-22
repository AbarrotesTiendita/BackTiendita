import { Router } from 'express'
import { getUsuarios} from '../routes/usuarios.routes'

const router = Router()

router.get('/usuarios', getUsuarios)

export default router