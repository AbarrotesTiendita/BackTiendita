import { pool } from '../db.js'

export const getProveedores = async (req, res) => {
    try {
    const [rows]= await pool.query('SELECT * FROM proveedor')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProveedor = async (req, res) => {
    try {
    const [rows]= await pool.query('SELECT * FROM proveedor WHERE idProveedor = ?', [req.params.id])
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postProveedores = async (req, res) => {
    const {Nom_Proveedor, Contacto, Descripcion_Proveedor} = req.body
    try {
    const [rows] = await pool.query('INSERT INTO proveedor (Nom_Proveedor, Contacto, Descripcion_Proveedor) VALUES (?, ?, ?)', [Nom_Proveedor, Contacto, Descripcion_Proveedor])
    res.send({
        id: rows.insertId,
        Nom_Proveedor, 
        Contacto, 
        Descripcion_Proveedor
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const putProveedores = async (req, res) => {
    const {idProveedor} = req.params
    const {Nom_Proveedor, Contacto, Descripcion_Proveedor} = req.body
    try {
    const [result] = await pool.query('UPDATE proveedor SET Nom_Proveedor = IFNULL(?, Nom_Proveedor), Contacto = IFNULL(?, Contacto), Descripcion_Proveedor = IFNULL(?, Descripcion_Proveedor) WHERE idProveedor = ?', [Nom_Proveedor, Contacto, Descripcion_Proveedor, idProveedor])
    console.log(result)  
    if (result === 0) return res.status(404).json({
        message:'Proveedor no actualizado'
    })
    res.json('Actualizado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}
 
export const deleteProveedores = async (req, res) => {
    try {
    const result = await pool.query('DELETE FROM proveedor WHERE idProveedor = ?', [req.params.id])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Proveedor no encontrado'
    })
    res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        }) 
    }
} 