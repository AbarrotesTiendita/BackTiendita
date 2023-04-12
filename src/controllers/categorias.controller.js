import { pool } from '../db.js'

export const getCategorias = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM categoria')
    res.json(rows)
    }   catch (error){
            return res.status(500).json({
                message:'Algo salio mal'
        })
    }
}

export const getCategoriaa = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM categoria where Nom_Categoria = ?;', [req.params.id])
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

export const putCategoriact = async (req, res) => {
    const {idCategoria} = req.params
    const {Nom_Categoria, Descripcion_Categoria} = req.body
    try {
    const [result] = await pool.query('UPDATE categoria SET Nom_Categoria = IFNULL(?, Nom_Categoria), Descripcion_Categoria = IFNULL(?, Descripcion_Categoria) WHERE idCategoria = ?', [Nom_Categoria, Descripcion_Categoria, idCategoria])
    console.log(result)
    if(result === 0) return res.status(404).json({
        message:'Categoria no actualizada'
    })
    res.json('Actualizado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getCategoria = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM categoria where idCategoria = ?', [req.params.id])
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

export const postCategorias = async (req, res) => {
    const {Nom_Categoria, Descripcion_Categoria} = req.body
    try {
    const [rows] = await pool.query('INSERT INTO categoria (Nom_Categoria, Descripcion_Categoria) VALUES (?, ?)', [Nom_Categoria, Descripcion_Categoria])
    res.send({
        id: rows.insertId,
        Nom_Categoria,
        Descripcion_Categoria
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const deleteCategoria = async (req, res) => {
    try {
    const [result] = await pool.query('DELETE FROM categoria WHERE idCategoria = ?', [req.params.id])
    if (result.affectedRows <=0) return res.status(404).json({
        message:'Categoria no encontrada'
    })
    res.send('Categoria eliminada')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}  
