import {pool} from '../db.js'

export const getGCategoria = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT c.Nom_Categoria, SUM(dv.Total) as TotalVentas FROM venta v JOIN detalle_venta dv ON v.idVenta = dv.idVenta JOIN producto p ON dv.Codigo = p.Codigo JOIN categoria c ON p.idCategoria = c.idCategoria WHERE fecha_hora = CURDATE() GROUP BY c.idCategoria')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}