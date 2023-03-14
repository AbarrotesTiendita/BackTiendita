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

export const getVentas = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT count(*) +1 AS Ventas FROM venta')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postVentas = async (req, res) => {
    const {idOperacion, idVendedor, fecha_hora, Total} = req.body
    try {
    const [rows] = await pool.query('INSERT INTO venta (idOperacion, idVendedor, fecha_hora, Total) VALUES (?, ?, ?, ?)', [idOperacion, idVendedor, fecha_hora, Total])
    res.send({
        id: rows.insertId,
        idOperacion, 
        idVendedor, 
        fecha_hora, 
        Total
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const putVentas = async (req, res) => {
    const {idVenta} = req.params
    const {idOperacion, idVendedor, fecha_hora, Total} = req.body
    try {
    const [result] = await pool.query('UPDATE venta SET idOperacion = IFNULL(?, idOperacion), idVendedor = IFNULL(?, idVendedor), fecha_hora = IFNULL(?, fecha_hora), Total = IFNULL(?, Total) WHERE idVenta = ?', [idOperacion, idVendedor, fecha_hora, Total, idVenta])
    console.log(result)
    if(result === 0) return res.status(404).json({
        message:'Venta no encontrada'
    })
    res.json('Actualizado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}