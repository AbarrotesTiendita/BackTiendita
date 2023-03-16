import { pool } from '../db.js'

export const getGCategoria = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT c.Nom_Categoria, SUM(dv.Total) AS Ventas_Dia FROM categoria c INNER JOIN producto p ON c.idCategoria = p.idCategoria INNER JOIN detalle_venta dv ON p.Codigo = dv.Codigo INNER JOIN venta v ON dv.idVenta = v.idVenta WHERE DATE(v.fecha_hora) = CURRENT_DATE() GROUP BY c.Nom_Categoria')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getEntradas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT SUM(CASE WHEN c.idOperacion = 2 THEN c.Cantidad ELSE 0 END)as Entradas FROM caja c INNER JOIN venta v ON c.idVendedor = v.idVendedor WHERE DATE(v.fecha_hora) = CURDATE() GROUP BY DATE(v.fecha_hora), c.idOperacion')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getSalidas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT SUM(CASE WHEN c.idOperacion = 3 THEN c.Cantidad ELSE 0 END)as Salidas FROM caja c INNER JOIN venta v ON c.idVendedor = v.idVendedor WHERE DATE(v.fecha_hora) = CURDATE() GROUP BY DATE(v.fecha_hora), c.idOperacion')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}