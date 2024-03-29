import express from 'express'
import cors from 'cors'
import vendedoresRoutes from './routes/vendedores.routes.js'
import productosRoutes from './routes/productos.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import clienteRoutes from './routes/cliente.routes.js'
import paqueteRoutes from './routes/paquete.routes.js'
import indexRoutes from './routes/index.routes.js'
import ventasRoutes from './routes/ventas.routes.js'
import reporteRoutes from './routes/reporte.routes.js'
import loginRoutes from './routes/usuarios.routes.js'
import proveedoresRoutes from './routes/proveedores.routes.js'
import cajaRoutes from './routes/caja.routes.js'
import sucursalRoutes from './routes/sucursal.routes.js'

const app = express()
app.use(cors());
app.use(express.json())
app.use('/api',vendedoresRoutes)
app.use('/api',productosRoutes)
app.use('/api',categoriaRoutes)
app.use('/api',clienteRoutes)
app.use('/api',paqueteRoutes)
app.use('/api',ventasRoutes)
app.use('/api',reporteRoutes)
app.use('/api',loginRoutes)
app.use('/api', proveedoresRoutes)
app.use('/api', cajaRoutes)
app.use('/api',sucursalRoutes)
app.use(indexRoutes)

export default app