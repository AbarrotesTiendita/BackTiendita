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

export const getTodoCajas = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT caja.*, operacion.Tipo_Operación as Nombre_Operación, vendedor.Nom_Vendedor FROM caja JOIN operacion ON caja.idOperacion = operacion.idOperacion JOIN vendedor ON caja.idVendedor = vendedor.idVendedor WHERE caja.fecha = CURDATE();')
    res.json(rows)
    }   catch (error){
            return res.status(500).json({
                message:'Algo salio mal'
        })
    }
}