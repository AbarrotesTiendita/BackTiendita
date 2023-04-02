        import { pool } from '../db.js'

export const getInvercion = async (req, res) => {
    try {
    const [rows]= await pool.query('SELECT SUM(Precio_Compra) AS Invercion FROM producto')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}


export const getAprox = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT SUM(Precio_Venta) AS Ganacias FROM producto')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProductos = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM producto')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProducto = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM producto WHERE Codigo = ?', [req.params.id])
    if (rows.length <= 0) return res.status(404).json({
        message: 'El producto no existe'
    })
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postProductos = async (req, res) => {
    const {Codigo, Nom_Producto, Precio_Compra, Precio_Venta, Unidad, Stock, idProveedor, idCategoria} = req.body
    try {
    const [rows] = await pool.query('insert into producto (Codigo, Nom_Producto, Precio_Compra, Precio_Venta, Unidad ,Stock, idProveedor, idCategoria) values(?, ?, ?, ?, ?, ?, ?, ?)',[Codigo, Nom_Producto, Precio_Compra, Precio_Venta, Unidad, Stock, idProveedor, idCategoria])
    res.send({
        Codigo, 
        Nom_Producto, 
        Precio_Compra, 
        Precio_Venta,
        Unidad, 
        Stock, 
        idProveedor, 
        idCategoria
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const putProductos = async (req, res) => {
    const {Codigo} = req.params
    const {Nom_Producto, Precio_Compra, Precio_Venta, Unidad, Stock, idProveedor, idCategoria} = req.body
    try {
    const [result] = await pool.query('UPDATE producto SET Nom_Producto = IFNULL(?, Nom_Producto), Precio_Compra = IFNULL(?, Precio_Compra), Precio_Venta = IFNULL(?, Precio_Venta), Unidad = IFNULL(?, Unidad), Stock = IFNULL(?, Stock), idProveedor = IFNULL(?, idProveedor), idCategoria = IFNULL(?, idCategoria) WHERE Codigo = ?', [Nom_Producto, Precio_Compra, Precio_Venta, Unidad, Stock, idProveedor, idCategoria, Codigo])
    console.log(result)
    if(result === 0) return res.status(404).json({
        message:'Producto no actualizado'
    })
    res.json('Actualizado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const deleteProductos = async (req, res) => {
    try {
    const [result] = await pool.query('DELETE FROM producto WHERE Codigo = ?', [req.params.id])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })
    res.send('Producto eliminado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}