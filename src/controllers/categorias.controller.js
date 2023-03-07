import { pool } from '../db.js'

export const getCartegorias = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM categoria')
    res.json(rows)
}

export const postCategorias = async (req, res) => {
    const {Nom_Categoria, Descripcion_Categoria} = req.body
    const [rows] = await pool.query('INSERT INTO categoria (Nom_Categoria, Descripcion_Categoria) VALUES (?, ?)', [Nom_Categoria, Descripcion_Categoria])
    res.send({
        id: rows.insertId,
        Nom_Categoria, 
        Descripcion_Categoria
    })
}       