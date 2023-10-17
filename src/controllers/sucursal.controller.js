import { pool } from '../db.js'

export const postSucursal = async (req, res) => {
    const {idSucursal, Nom_Sucursal, Direccion_Sucursal, Contacto_Sucursal} = req.body
    try {
    const [rows] = await pool.query('insert into sucursal(idSucursal, Nom_Sucursal, Direccion_Sucursal, Contacto_Sucursal) values (?, ?, ?, ?)',[idSucursal, Nom_Sucursal, Direccion_Sucursal, Contacto_Sucursal])
    res.send({
        idSucursal, 
        Nom_Sucursal, 
        Direccion_Sucursal, 
        Contacto_Sucursal
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getSucursal = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM sucursal')
    res.json(rows)
    }   catch (error){
            return res.status(500).json({
                message:'Algo salio mal'
        })
    }
}

