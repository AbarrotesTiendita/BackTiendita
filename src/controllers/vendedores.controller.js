import { pool } from '../db.js'

export const getVendedores = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM vendedor')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getVendedor = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM vendedor WHERE idVendedor = ?', [req.params.id])
    if (rows.length <= 0) return res.status(404).json({
        message: 'Vendedor no encontrado'
    })
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postVendedores = async (req, res) => {
    const {idVendedor_Permisos,Nom_Vendedor, Contraseña} = req.body
    try {
    const [rows] = await pool.query('insert into vendedor (idVendedor_Permisos, Nom_Vendedor, Contraseña)  VALUES (?, ?, sha1(?))', [idVendedor_Permisos, Nom_Vendedor, Contraseña])
    res.send({
        id: rows.insertId,
        Nom_Vendedor,
        Contraseña
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
} 

export const putVendedores = async (req, res) => {
    const {idVendedor} = req.params
    const {Nom_Vendedor, Contraseña} = req.body
    try {
    const [result] = await pool.query('UPDATE vendedor SET Nom_Vendedor = IFNULL(?, Nom_Vendedor), Contraseña = IFNULL(sha1(?), Contraseña) WHERE idVendedor = ?', [Nom_Vendedor, Contraseña, idVendedor])
    console.log(result)
    if(result === 0) return res.status(404).json({
        message:'Vendedor no actualizado'
    })
    res.json('Actualizado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const putPermisos = async (req, res) => {
    const {idVendedor} = req.body
    const {idVendedor_Permisos} = req.body
    try {
    const [result] = await pool.query('UPDATE vendedor SET idVendedor_Permisos = ? WHERE idVendedor = ?', [idVendedor_Permisos, idVendedor])
    console.log(result)
    if (result === 0) return res.status(404).json({
        message:'Permiso no actualizado'
    })
    res.json('Actualizado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const deleteVendedores = async (req, res) => {
    try {
    const [result] = await pool.query('DELETE FROM vendedor WHERE idVendedor = ?', [req.params.id])
    console.log(result);
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Vendedor no encontrado'
    })
    res.send('Vendedor eliminado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        }) 
    }
}    