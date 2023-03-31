import { pool } from '../db.js'

export const getProveedores = async (req, res) => {
    try {
<<<<<<< HEAD
    const [rows]= await pool.query('SELECT * FROM proveedor')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
=======
    const [rows] = await pool.query('SELECT * FROM proveedor')
    res.json(rows)
    }   catch (error){
            return res.status(500).json({
                message:'Algo salio mal'
>>>>>>> 026f148b23fb01bdb31c3ae2d6503473dd584585
        })
    }
}

export const getProveedor = async (req, res) => {
    try {
<<<<<<< HEAD
    const [rows]= await pool.query('SELECT * FROM proveedor WHERE idProveedor = ?', [req.params.id])
=======
    const [rows] = await pool.query('SELECT * FROM proveedor WHERE idProveedor = ?', [req.params.id])
    if (rows.length <= 0) return res.status(404).json({
        message: 'El proveedor no existe'
    })
>>>>>>> 026f148b23fb01bdb31c3ae2d6503473dd584585
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postProveedores = async (req, res) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 026f148b23fb01bdb31c3ae2d6503473dd584585
            message:'Algo salio mal'
        })
    }
}

export const putProveedores = async (req, res) => {
    const {idProveedor} = req.params
<<<<<<< HEAD
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
=======
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
>>>>>>> 026f148b23fb01bdb31c3ae2d6503473dd584585
        })
    }
}

<<<<<<< HEAD
 
export const deleteProveedores = async (req, res) => {
    try {
    const result = await pool.query('DELETE FROM proveedor WHERE idProveedor = ?', [req.params.id])
=======
export const deleteProveedores = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM proveedor WHERE idProveedor = ?', [req.params.id])
>>>>>>> 026f148b23fb01bdb31c3ae2d6503473dd584585
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Proveedor no encontrado'
    })
    res.sendStatus(204)
    } catch (error) {
<<<<<<< HEAD
        return res.status(500).json({
            message:'Algo salio mal'
        }) 
=======
        return res.sendStatus(500).json({
            message:'Algo salio mal'
        })
>>>>>>> 026f148b23fb01bdb31c3ae2d6503473dd584585
    }
} 