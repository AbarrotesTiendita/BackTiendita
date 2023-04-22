import { pool } from '../db.js'

export const getDVentas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT v.idVenta, v.fecha, SUM(dv.Total) AS Total_Venta, JSON_ARRAYAGG(JSON_OBJECT("Codigo", dv.Codigo, "Nom_producto", dv.Nom_producto, "Cantidad", dv.Cantidad, "Precio_Compra", dv.Precio_Compra, "Precio_Venta", dv.Precio_Venta, "Total", dv.Total, "Ganancia", dv.Ganancia)) AS Productos FROM venta v INNER JOIN detalle_venta dv ON dv.idVenta = v.idVenta WHERE v.fecha = CURDATE() GROUP BY v.idVenta, v.fecha')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getSVentas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT v.idVenta, v.fecha, SUM(dv.Total) AS Total_Venta, JSON_ARRAYAGG(JSON_OBJECT("Codigo", dv.Codigo, "Nom_producto", dv.Nom_producto, "Cantidad", dv.Cantidad, "Precio_Compra", dv.Precio_Compra, "Precio_Venta", dv.Precio_Venta, "Total", dv.Total, "Ganancia", dv.Ganancia)) AS Productos FROM venta v INNER JOIN detalle_venta dv ON dv.idVenta = v.idVenta WHERE WEEK(v.fecha) = WEEK(CURDATE())GROUP BY v.idVenta, v.fecha;')
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

export const getAllVentas= async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT v.idVenta, v.fecha, SUM(dv.Total) AS Total_Venta, JSON_ARRAYAGG(JSON_OBJECT("Codigo", dv.Codigo, "Nom_producto", dv.Nom_producto, "Cantidad", dv.Cantidad, "Precio_Compra", dv.Precio_Compra, "Precio_Venta", dv.Precio_Venta, "Total", dv.Total, "Ganancia", dv.Ganancia)) AS Productos FROM venta v INNER JOIN detalle_venta dv ON dv.idVenta = v.idVenta WHERE v.fecha >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) AND v.fecha <= CURRENT_DATE() GROUP BY v.idVenta, v.fecha;')
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