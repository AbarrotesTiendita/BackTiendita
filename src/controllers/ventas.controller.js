import { pool } from '../db.js'

export const getActuales = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT SUM(Total) AS Ganancias FROM venta WHERE fecha = CURDATE()')
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

export const getDias = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT count(*) AS Ventas FROM venta where fecha = curdate()')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getTotal = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT sum(Total) from venta where fecha = curdate()')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postVentas = async (req, res) => {
    const {idVendedor, Total} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO venta (idVendedor, fecha, hora, Total) VALUES (?, CURDATE(), CURRENT_TIME(), ?)', [idVendedor, Total])
        console.log(rows);
        res.send({
            id: rows.insertId,
            idVendedor,
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
    const {idVendedor, Total} = req.body
    try {
    const [result] = await pool.query('UPDATE venta SET idVendedor = IFNULL(?, idVendedor), Total = IFNULL(?, Total) WHERE idVenta = ?', [idVendedor, Total, idVenta])
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