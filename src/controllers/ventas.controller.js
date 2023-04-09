import { pool } from '../db.js'

export const getDVentas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT v.*, dv.* FROM venta v JOIN detalle_venta dv ON v.idVenta = dv.idVenta WHERE v.fecha = curdate()')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getSVentas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT v.*, dv.* FROM venta v JOIN detalle_venta dv ON v.idVenta = dv.idVenta WHERE YEARWEEK(v.fecha) = YEARWEEK(CURDATE())')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getMVentas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT v.*, dv.* FROM venta v JOIN detalle_venta dv ON v.idVenta = dv.idVenta WHERE MONTH(v.fecha) = MONTH(CURDATE())')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

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
        const [rows] = await pool.query('SELECT MAX(idVenta) FROM venta');
        const lastId = rows[0]['MAX(idVenta)'];
        res.json({ last_id: lastId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
};


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
            idVenta: rows.insertId,
            idVendedor,
            Total
        })
    } catch (error) { 
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}



export const postDetalleVentas = async (req, res) => {
    const {idVenta, Codigo, Nom_producto, Cantidad, Precio_compra, Precio_venta} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO detalle_venta (idVenta,Codigo, Nom_producto, Cantidad, Precio_compra, Precio_venta) VALUES (?, ?, ?, ?, ?, ?)', [idVenta,Codigo, Nom_producto, Cantidad, Precio_compra, Precio_venta])
        console.log(rows);
        res.send(
            "producto insertado correctament"
        )
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