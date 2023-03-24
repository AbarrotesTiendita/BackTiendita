import { pool } from '../db.js'

export const getProveedores = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM proveedor')
    res.json(rows)
    }   catch (error){
            return res.status(500).json({
                message:'Algo salio mal'
        })
    }
}

export const getProveedor = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM proveedor WHERE idProveedor = ?', [req.params.id])
    if (rows.length <= 0) return res.status(404).json({
        message: 'El proveedor no existe'
    })
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postProveedores = async (req, res) => {
    const { Nom_Proveedor, Contacto } = req.body
    try {
        const [rows] = await pool.query('insert into proveedor (Nom_Proveedor, Contacto) values (?, ?)', [Nom_Proveedor, Contacto])
        res.json({
            id: rows.insertId,
            Nom_Proveedor, 
            Contacto
        })
    } catch (error) {
        return res.status(505).json({
            message:'Algo salio mal'
        })
    }
}