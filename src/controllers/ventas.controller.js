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
        const [rows] = await pool.query(`SELECT v.idVenta, v.Fecha, v.idCaja, vendedor.Nom_Vendedor, SUM(dv.Total_Venta) AS Total_Venta, JSON_ARRAYAGG(JSON_OBJECT("Codigo_Producto", dv.Codigo_Producto, "Nom_Producto", p.Nom_Producto, "Cantidad_Producto", dv.Cantidad_Producto, "Precio_Compra", dv.Precio_Compra, "Precio_Venta", dv.Precio_Venta, "Total_Venta", dv.Total_Venta, "Ganancia", dv.Ganancia)) AS Productos FROM venta v INNER JOIN detalle_venta dv ON dv.idVenta = v.idVenta INNER JOIN producto p ON p.Codigo_Producto = dv.Codigo_Producto INNER JOIN vendedor ON vendedor.idVendedor = v.idVendedor WHERE WEEK(v.Fecha) = WEEK(CURDATE()) GROUP BY v.idVenta, v.Fecha, v.idCaja, vendedor.Nom_Vendedor;`);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
        message: 'Algo salió mal',
        });
    }
};


export const getEntradas = async (req, res) => {
    try {
    const [rows] = await pool.query('select SUM(Cantidad_Dinero) AS Entradas from operacion_caja where idOperacion = 2 and Fecha = CURDATE();')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getSalidas = async (req, res) => {
    try {
    const [rows] = await pool.query('select SUM(Cantidad_Dinero) AS Salidas from operacion_caja where idOperacion = 3 and Fecha = CURDATE();')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}


export const getActuales = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT SUM(Total_Venta) AS Ganancias FROM venta WHERE Fecha = CURDATE();')
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

export const getAllVentas = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT v.idVenta, v.Fecha, v.Hora, v.idCaja, vendedor.Nom_Vendedor, SUM(dv.Total_Venta) AS Total_Venta, JSON_ARRAYAGG(JSON_OBJECT("Codigo_Producto", dv.Codigo_Producto, "Nom_Producto", p.Nom_Producto, "Cantidad_Producto", dv.Cantidad_Producto, "Precio_Compra", dv.Precio_Compra, "Precio_Venta", dv.Precio_Venta, "Total_Venta", dv.Total_Venta, "Ganancia", dv.Ganancia)) AS Productos FROM venta v INNER JOIN detalle_venta dv ON dv.idVenta = v.idVenta INNER JOIN producto p ON p.Codigo_Producto = dv.Codigo_Producto INNER JOIN vendedor ON vendedor.idVendedor = v.idVendedor INNER JOIN caja ON caja.idCaja = v.idCaja WHERE v.Fecha >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) AND v.Fecha <= CURRENT_DATE() GROUP BY v.idVenta, v.Fecha, v.Hora, v.idCaja, vendedor.Nom_Vendedor;`);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
        message: 'Algo salió mal',
        });
    }
};


export const postVentas = async (req, res) => {
    const { idVendedor, idCaja, Total } = req.body;
    try {
        const [rows] = await pool.query(
        'INSERT INTO venta (idVendedor, Fecha, Hora, idCaja, Total_Venta) VALUES (?, CURDATE(), CURTIME(), ?, ?)',
        [idVendedor, idCaja, Total]
        );
        console.log(rows);
        res.send({
        idVenta: rows.insertId,
        idCaja,
        idVendedor,
        Total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: 'Algo salió mal'
        });
    }
};




export const postDetalleVentas = async (req, res) => {
    const {idVenta, Codigo_Producto, Cantidad_Producto, Precio_Compra, Precio_Venta, Devuelto} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO detalle_venta (idVenta, Codigo_Producto, Cantidad_Producto, Precio_Compra, Precio_Venta, Devuelto) VALUES (?, ?, ?, ?, ?, ?)', [idVenta, Codigo_Producto, Cantidad_Producto, Precio_Compra, Precio_Venta, Devuelto])
        console.log(rows);
        res.send(
            "producto insertado correctamente"
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