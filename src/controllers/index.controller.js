import { pool } from '../db.js'

export const ping = async(req, res) => {
    const [rows] = await pool.query('SELECT * FROM producto')
    res.json(rows)
}