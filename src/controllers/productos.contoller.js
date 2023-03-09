import { pool } from '../db.js'

export const getInvercion = async (req, res) => {
    const [rows]= await pool.query('SELECT SUM(Precio_Compra) AS Invercion FROM producto')
    res.json(rows)
}

export const getProductos = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM producto')
    res.json(rows)
}

export const getProducto = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM producto WHERE Codigo = ?', [req.params.id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'El producto no existe'
    })

    res.json(rows)
}

export const putProductos = async (req, res) => {
    const {Codigo} = req.params
    const {Nom_Producto, Precio_Compra, Precio_Venta, Stock, idProveedor, idCategoria} = req.body

    const [result] = await pool.query('UPDATE producto SET Nom_Producto = IFNULL(?, Nom_Producto), Precio_Compra = IFNULL(?, Precio_Compra), Precio_Venta = IFNULL(?, Precio_Venta), Stock = IFNULL(?, Stock), idProveedor = IFNULL(?, idProveedor), idCategoria = IFNULL(?, idCategoria) WHERE Codigo = ?', [Nom_Producto, Precio_Compra, Precio_Venta, Stock, idProveedor, idCategoria, Codigo])

    console.log(result)

    if(result === 0) return res.status(404).json({
        message:'Producto no actualizado'
    })

    res.json('Actualizado')
}

export const deleteProductos = async (req, res) => {
    const [result] = await pool.query('DELETE FROM producto WHERE Codigo = ?', [req.params.id])
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })
    
    res.send('Producto eliminado')
}