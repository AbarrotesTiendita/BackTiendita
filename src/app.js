import express from 'express'
import vendedoresRoutes from './routes/vendedores.routes.js'
import productosRoutes from './routes/productos.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import indexRoutes from './routes/index.routes.js'
import ventasRoutes from './routes/ventas.routes.js'
import reporteRoutes from './routes/reporte.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import loginRoutes from './routes/usuarios.routes'  

const app = express()

app.use(express.json())

app.use('/api',vendedoresRoutes)
app.use('/api',productosRoutes)
app.use('/api',categoriaRoutes)
app.use('/api',ventasRoutes)
app.use('/api',reporteRoutes)
app.use('/api',usuariosRoutes)
app.use('/api',loginRoutes)
app.use(indexRoutes)

export default app