import { pool } from '../db.js'

export const getGCategoria = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT c.Nom_Categoria, SUM(dv.Total_Venta) AS Ventas_Dia FROM categoria c INNER JOIN producto p ON c.idCategoria = p.idCategoria INNER JOIN detalle_venta dv ON p.Codigo_Producto = dv.Codigo_Producto INNER JOIN venta v ON dv.idVenta = v.idVenta WHERE DATE(v.Fecha) = CURRENT_DATE() GROUP BY c.Nom_Categoria')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getOperacion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT operacion.Tipo_Operacion, SUM(operacion_caja.Cantidad_Dinero) AS Cantidad FROM operacion_caja INNER JOIN operacion ON operacion_caja.idOperacion = operacion.idOperacion WHERE operacion_caja.Fecha = CURDATE() GROUP BY operacion.Tipo_Operacion;')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getStock = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM producto WHERE Stock_Disponible = (SELECT MIN(Stock_Disponible) FROM producto)')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProductomax = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT p.Nom_Producto, SUM(dv.Cantidad_Producto) AS TotalVentas FROM producto p JOIN detalle_venta dv ON p.Codigo_Producto = dv.Codigo_Producto GROUP BY p.Codigo_Producto ORDER BY TotalVentas DESC LIMIT 1')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProductomen = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT p.Nom_Producto, SUM(dv.Cantidad_Producto) AS TotalVentas FROM producto p JOIN detalle_venta dv ON p.Codigo_Producto = dv.Codigo_Producto GROUP BY p.Codigo_Producto ORDER BY TotalVentas ASC LIMIT 1')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}