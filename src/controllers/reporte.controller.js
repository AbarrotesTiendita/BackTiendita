import { pool } from '../db.js'

export const getGCategoria = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT c.Nom_Categoria, SUM(dv.Total) AS Ventas_Dia FROM categoria c INNER JOIN producto p ON c.idCategoria = p.idCategoria INNER JOIN detalle_venta dv ON p.Codigo = dv.Codigo INNER JOIN venta v ON dv.idVenta = v.idVenta WHERE DATE(v.fecha) = CURRENT_DATE() GROUP BY c.Nom_Categoria')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getOperacion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT operacion.Tipo_Operación, SUM(caja.Cantidad) AS Cantidad FROM caja INNER JOIN operacion ON caja.idOperacion = operacion.idOperacion WHERE caja.fecha = CURDATE() GROUP BY operacion.Tipo_Operación')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getStock = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM producto WHERE Stock = (SELECT MIN(Stock) FROM producto)')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProductomax = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT p.Nom_Producto, SUM(dv.Cantidad) AS TotalVentas FROM producto p JOIN detalle_venta dv ON p.Codigo = dv.Codigo GROUP BY p.Codigo ORDER BY TotalVentas DESC LIMIT 1')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProductomen = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT p.Nom_Producto, SUM(dv.Cantidad) AS TotalVentas FROM producto p JOIN detalle_venta dv ON p.Codigo = dv.Codigo GROUP BY p.Codigo ORDER BY TotalVentas ASC LIMIT 1')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}