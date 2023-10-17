import { pool } from '../db.js'


export const postCompu = async (req, res) => {
    const {idCompu, Nom_Compu, Activa} = req.body
    try {
    const [rows] = await pool.query('insert into computadora (idCompu, Nom_Compu, Activa) values (?, ?, true)', [idCompu, Nom_Compu, Activa])
    console.log(rows)
    res.send({
        id: rows.insertId,
        idCompu, 
        Nom_Compu, 
        Activa
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postCaja = async (req, res) => {
    const {idCaja, idCompu} = req.body
    try {
    const [rows] = await pool.query('insert into caja(idCaja, idCompu) values (?, ?)', [idCaja, idCompu])
    console.log(rows)
    res.send({
        id: rows.insertId,
        idCaja, 
        idCompu
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postEntrada = async (req, res) => { 
    const {idCaja, idCompu, idOperacion, idVendedor, Cantidad_Dinero, Descripcion_Operacion, Fecha, Hora} = req.body
    try {
    const [rows] = await pool.query
    ('INSERT INTO operacion_caja (idCaja, idCompu, idOperacion, idVendedor, Cantidad_Dinero, Descripcion_Operacion, Fecha, Hora) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), CURRENT_TIME());', 
    [idCaja, idCompu, idOperacion, idVendedor, Cantidad_Dinero, Descripcion_Operacion, Fecha, Hora])
    console.log(rows)
    res.send({
        id: rows.insertId,
        idCaja, 
        idCompu, 
        idOperacion, 
        idVendedor, 
        Cantidad_Dinero, 
        Descripcion_Operacion
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getCajas = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT  SUM(CASE WHEN idOperacion = 2 THEN Cantidad_Dinero ELSE 0 END) AS entradas, SUM(CASE WHEN idOperacion = 3 THEN Cantidad_Dinero ELSE 0 END) AS salidas, SUM(CASE WHEN idOperacion = 2 THEN Cantidad_Dinero ELSE 0 END) - SUM(CASE WHEN idOperacion = 3 THEN Cantidad_Dinero ELSE 0 END) AS dineroEnCaja FROM operacion_caja WHERE Fecha = CURDATE(); ')
    res.json(rows)
    }   catch (error){
            return res.status(500).json({
                message:'Algo salio mal'
        })
    }
}

export const getTodoCajas = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT c.idCaja, o.Tipo_Operacion, v.Nom_Vendedor, c.Cantidad_Dinero, c.Fecha, c.Hora ,c.Descripcion_Operacion FROM operacion_caja as c JOIN operacion as o ON c.idOperacion = o.idOperacion JOIN vendedor as v ON c.idVendedor = v.idVendedor WHERE Fecha = CURDATE();')
    res.json(rows)
    }   catch (error){
            return res.status(500).json({
                message:'Algo salio mal'
        })
    }
}