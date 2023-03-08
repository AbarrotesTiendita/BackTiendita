import { pool } from '../db.js'

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
    const {}
}

export const deleteProductos = async (req, res) => {
    const [result] = await pool.query('DELETE FROM producto WHERE Codigo = ?', [req.params.id])
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })
    
    res.send('Producto eliminado')
}