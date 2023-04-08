import { pool } from '../db.js'

export const getCajas = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT  SUM(CASE WHEN idOperacion = 2 THEN Cantidad ELSE 0 END) AS entradas, SUM(CASE WHEN idOperacion = 3 THEN Cantidad ELSE 0 END) AS salidas, SUM(CASE WHEN idOperacion = 2 THEN Cantidad ELSE 0 END) - SUM(CASE WHEN idOperacion = 3 THEN Cantidad ELSE 0 END) AS dineroEnCaja FROM caja WHERE fecha = CURDATE();')
    res.json(rows)
    }   catch (error){
            return res.status(500).json({
                message:'Algo salio mal'
        })
    }
}