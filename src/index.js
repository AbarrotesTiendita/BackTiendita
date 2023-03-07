import express from 'express'
import vendedoresRoutes from './routes/vendedores.routes.js'
import productosRoutes from './routes/productos.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use('/api',vendedoresRoutes)
app.use('/api', productosRoutes)
app.use('/api', categoriaRoutes)
app.use(indexRoutes)

app.listen(3000)
console.log('Servidor en el puerto 3000')   