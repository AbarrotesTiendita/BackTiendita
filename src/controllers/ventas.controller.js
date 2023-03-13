import { pool } from '../db.js'

export const getActuales = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT SUM(Total) AS Ganancias FROM venta WHERE fecha_hora = GETDATE()')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}