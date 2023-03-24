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

export const putProveedores = async (req, res) => {
    const {idProveedor} = req.params
    const {Nom_Proveedor, Contacto} = req.body
    try {
        const [result] = await pool.query('UPDATE proveedor SET Nom_Proveedor = IFNULL(?, Nom_Proveedor), Contacto = IFNULL(?, Contacto) WHERE idProveedor = ?', [Nom_Proveedor, Contacto, idProveedor])
        console.log(result)
        if(result === 0) return res.status(404).json({
            message:'Proveedor no actualizado'
        })
        res.status('Actualizado')
    } catch (error) {
        return res.send(500).json({
            message: 'Algo salio mal'
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
    return res.sendStatus(500).json({
        message:'Algo salio mal'
    })
}
} 