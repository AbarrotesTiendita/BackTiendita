import express from 'express'
import vendedoresRoutes from './routes/vendedores.routes.js'
import productosRoutes from './routes/productos.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import indexRoutes from './routes/index.routes.js'

import {PORT} from './config.js'

const app = express()

app.use(express.json())

app.use('/api',vendedoresRoutes)
app.use('/api', productosRoutes)
app.use('/api', categoriaRoutes)
app.use(indexRoutes)

export default app