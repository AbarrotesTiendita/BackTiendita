import { pool } from '../db.js'

export const getVendedores = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM vendedor')
    res.json(rows)
}

export const getVendedor = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM vendedor WHERE idVendedor = ?', [req.params.id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'Vendedor no encontrado'
    })

    res.json(rows)
}

export const postVendedores = async (req, res) => {
    const {Nom_Vendedor, Contraseña} = req.body
    const [rows] = await pool.query('INSERT INTO vendedor (Nom_Vendedor, Contraseña) VALUES (?, sha1(?))', [Nom_Vendedor, Contraseña])
    res.send({
        id: rows.insertId,
        Nom_Vendedor,
        Contraseña
    })
}
//puta tienda de mierda

export const putVendedores = async (req, res) => {
    const {idVendedor} = req.params
    const {Nom_Vendedor, Contraseña} = req.body

    const [result] = await pool.query('UPDATE vendedor SET Nom_Vendedor = ?, Contraseña = sha1(?) WHERE idVendedor = ?', [Nom_Vendedor, Contraseña, idVendedor])

    console.log(result)

    if(result === 0) return res.status(404).json({
        message:'Vendedor no actualizado'
    })

    res.json('Actualizado')
}

export const deleteVendedores = async (req, res) => {
    const result = await pool.query('DELETE FROM vendedor WHERE idVendedor = ?', [req.params.id])
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Vendedor no encontrado'
    })

    res.sendStatus(204)
}