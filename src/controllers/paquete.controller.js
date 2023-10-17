import { pool } from '../db.js'

export const getPaquetes = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT p.idPaquete, p.Nom_Paquete, p.Precio_Paquete, pr.Nom_Producto, pp.Cantidad_Producto, p.Descripcion_Paquete FROM paquete p INNER JOIN paquete_producto pp ON p.idPaquete = pp.idPaquete INNER JOIN producto pr ON pp.Codigo_Producto = pr.Codigo_Producto;')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getPaquetesCN = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT idPaquete, Nom_Paquete from paquete')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getVentaPaquete = async (req, res) => {
    try {
        const { idPaquete } = req.params;
        const [rows] = await pool.query('select p.idPaquete, pp.Codigo_Producto, pr.Nom_Producto, pp.Cantidad_Producto, pr.Precio_Compra, pr.Precio_Venta, pp.Precio_Promocion, pr.Stock_Disponible, pr.Unidad  from paquete as p  inner join paquete_producto as pp on pp.idPaquete = p.idPaquete  inner join producto as pr on pp.Codigo_Producto = pr.Codigo_Producto  where p.idPaquete = ?;', [idPaquete]);
        if (rows.length > 0) {
            res.json(rows); // Enviar todos los productos en lugar de solo rows[0]
        } else {
            return res.status(404).json({
                message: 'Paquete no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Algo salió mal'
        });
    }
}


export const postPaquete = async (req, res) => {
    const {idPaquete, Nom_Paquete, Precio_Paquete, Descripcion_Paquete} = req.body
    try {
    const [rows] = await pool.query('insert into paquete (idPaquete, Nom_Paquete, Precio_Paquete, Descripcion_Paquete) values(?, ?, ?, ?)',[idPaquete, Nom_Paquete, Precio_Paquete, Descripcion_Paquete])
    res.send({
        idPaquete, 
        Nom_Paquete, 
        Precio_Paquete, 
        Descripcion_Paquete
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}


export const postPaqueteProducto = async (req, res) => {
    const {idPaquete, Codigo_Producto, Precio_Promocion, Cantidad_Producto} = req.body
    try {
    const [rows] = await pool.query('insert into paquete_producto (idPaquete, Codigo_Producto, Precio_Promocion, Cantidad_Producto) values (?, ?, ?, ?) ',[idPaquete, Codigo_Producto, Precio_Promocion, Cantidad_Producto])
    res.send({
        idPaquete, 
        Codigo_Producto, 
        Precio_Promocion, 
        Cantidad_Producto
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const deletePaquete = async (req, res) => {
    try {
    const [result] = await pool.query('delete from paquete where idPaquete = ?', [req.params.idPaquete])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Paquete no encontrado'
    })
    res.send('Paquete eliminado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}