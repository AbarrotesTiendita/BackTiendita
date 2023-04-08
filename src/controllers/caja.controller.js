import { pool } from '../db.js'

export const postEntrada = async (req, res) => {
    const {idVendedor, idOperacion, Cantidad, fecha, hora} = req.body
    try {
    const [rows] = await pool.query('INSERT INTO caja (idVendedor, idOperacion, Cantidad, fecha, hora) VALUES (?, ?, ?, CURDATE(), CURRENT_TIME())', [idVendedor, idOperacion, Cantidad, fecha, hora])
    console.log(rows)
    res.send({
        id: rows.insertId,
        idVendedor,
        idOperacion,
        Cantidad
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}