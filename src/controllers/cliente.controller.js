import { pool } from '../db.js'

export const getCreditosPorCliente = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT c.Nom_Cliente, cr.Credito_Disponible FROM cliente c JOIN credito cr ON c.idCliente = cr.idCliente;')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const postCliente = async (req, res) => {
    const {Nom_Cliente, Direccion_Cliente, Contacto_Cliente} = req.body
    try {
    const [rows] = await pool.query('insert into cliente(Nom_Cliente, Direccion_Cliente, Contacto_Cliente) values (?, ?, ?)',[Nom_Cliente, Direccion_Cliente, Contacto_Cliente])
    res.send({
        Nom_Cliente, 
        Direccion_Cliente, 
        Contacto_Cliente
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getClienteIN = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT idCliente, Nom_Cliente from cliente')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getCreditos = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const [rows] = await pool.query('SELECT idCredito, Credito_Disponible FROM credito WHERE idCliente = ?', [idCliente]);
    
    if (rows.length > 0) {
        res.json(rows);
    } else {
        return res.status(404).json({
        message: 'Credito no encontrado'
        });
        }
    } catch (error) {
        return res.status(500).json({
        message: 'Algo salió mal'
        });
    }
}


export const getCliente = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const [rows] = await pool.query('SELECT Nom_Cliente FROM cliente WHERE idCliente = ?', [idCliente]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        });
    }
}

export const getDatosCliente = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const [rows] = await pool.query('select idCliente, Nom_Cliente, Direccion_Cliente, Contacto_Cliente from cliente where idCliente = ?', [idCliente]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        });
    }
}

export const postCredito = async (req, res) => {
    const { idCliente, Credito_Disponible } = req.body
    try {
    const [rows] = await pool.query('insert into credito(idCliente, Credito_Disponible) values (?, ?)',[idCliente, Credito_Disponible])
    res.send({
        idCliente, 
        Credito_Disponible
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getcreditoCliente = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const [rows] = await pool.query('SELECT idCliente, SUM(Credito_Disponible) AS TotalCreditoDisponible FROM credito WHERE idCliente=?', [idCliente]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        });
    }
}


export const putCredito = async (req, res) => {
    const { idCliente, idCredito } = req.params;
    const { Credito_Disponible } = req.body;

    try {
        await pool.query('CALL actualizar_credito(?, ?, ?)', [idCliente, idCredito, Credito_Disponible]);
        res.json('Crédito actualizado');
    } catch (error) {
        return res.status(500).json({
        message: 'Algo salió mal'
        });
    }
};


export const putCliente = async (req, res) => {
    const {idCliente} = req.params
    const {Nom_Cliente, Direccion_Cliente, Contacto_Cliente} = req.body
    try {
    const [result] = await pool.query('update cliente set Nom_Cliente = ?, Direccion_Cliente = ?, Contacto_Cliente = ? where idCliente = ?', [Nom_Cliente, Direccion_Cliente, Contacto_Cliente, idCliente])
    console.log(result)
    if(result === 0) return res.status(404).json({
        message:'Cliente no actualizado'
    })
    res.json('Cliente actualizado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const deleteCliente = async (req, res) => {
    try {
    const [result] = await pool.query('delete from cliente where idCliente = ?', [req.params.idCliente])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Cliente no encontrado'
    })
    res.send('Cliente eliminado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}