import { pool } from '../db.js'

export const getActuales = async (req, res) => {
    const [rows] = await pool.query('SELECT SUM(Total) AS Ganancias FROM venta')
    res.json(rows)
}