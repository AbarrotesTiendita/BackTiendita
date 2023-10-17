import { pool } from '../db.js'
        
export const getInvercion = async (req, res) => {
    try {
    const [rows]= await pool.query('SELECT ROUND(SUM(Precio_Compra * Stock_Disponible), 2) AS Invercion FROM producto')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getAprox = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT ROUND(SUM(Precio_Venta * Stock_Disponible), 2) AS Ganancias FROM producto;')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProductosPaquete = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT Codigo_Producto, Nom_Producto, Precio_Promocion from producto')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProductosPaqCodigo = async (req, res) => {
    try {
        const { Codigo_Producto } = req.params;
        const [rows] = await pool.query('SELECT Precio_Promocion FROM producto WHERE Codigo_Producto = ?', [Codigo_Producto]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        });
    }
}

export const getProductos = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT SUM(Stock_Disponible) AS total_stock FROM producto')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getProductoss = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT producto.Codigo_Producto, producto.Nom_Producto, producto.Precio_Compra, producto.Precio_Venta, producto.Precio_Promocion, producto.Unidad, producto.Stock_Disponible, producto.Disponible AS Esta_Disponible, producto.IdSucursal, categoria.Nom_Categoria, proveedor.Nom_Proveedor FROM producto INNER JOIN categoria ON producto.idCategoria = categoria.idCategoria INNER JOIN proveedor ON producto.idProveedor = proveedor.idProveedor')
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const getConsultarProducto = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM producto')
    res.json(rows)
    }   catch (error){
            return res.status(500).json({
                message:'Algo salio mal'
        })
    }
}


export const getProducto = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT Codigo_Producto, Nom_Producto, idCategoria, idProveedor, Precio_Compra, Precio_Venta, Unidad, Stock_Disponible, Disponible, idSucursal from producto WHERE Codigo_Producto = ?;', [req.params.id])
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


export const postProductos = async (req, res) => {
    const {Codigo_Producto, Nom_Producto, idProveedor, idCategoria, Precio_Compra, Precio_Venta, Precio_Promocion, Unidad, Stock_Disponible, Disponible, idSucursal} = req.body
    try {
    const [rows] = await pool.query('insert into producto (Codigo_Producto, Nom_Producto, idProveedor, idCategoria, Precio_Compra, Precio_Venta, Precio_Promocion, Unidad, Stock_Disponible, Disponible, idSucursal) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[Codigo_Producto, Nom_Producto, idProveedor, idCategoria, Precio_Compra, Precio_Venta, Precio_Promocion, Unidad , Stock_Disponible, Disponible, idSucursal])
    res.send({
        Codigo_Producto, 
        Nom_Producto,
        idProveedor, 
        idCategoria,
        Precio_Compra, 
        Precio_Venta,
        Precio_Promocion,
        Unidad, 
        Stock_Disponible, 
        Disponible,
        idSucursal
    })
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const putProductos = async (req, res) => {
    const {Codigo_Producto} = req.params
    const {Nom_Producto, Precio_Compra, Precio_Venta, Precio_Promocion, Unidad, Stock_Disponible, idProveedor, idCategoria, Disponible} = req.body
    try {
    const [result] = await pool.query('UPDATE producto SET Nom_Producto = ?, Precio_Compra = ?, Precio_Venta = ?, Precio_Promocion = ?, Unidad = ?, Stock_Disponible = ?, idProveedor = ?, idCategoria = ?, Disponible = ? WHERE Codigo_Producto = ?', [Nom_Producto, Precio_Compra, Precio_Venta, Precio_Promocion, Unidad, Stock_Disponible, idProveedor, idCategoria, Disponible, Codigo_Producto])
    console.log(result)
    if(result === 0) return res.status(404).json({
        message:'Producto no actualizado'
    })
    res.json('Actualizado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}

export const deleteProductos = async (req, res) => {
    try {
    const [result] = await pool.query('DELETE FROM producto WHERE Codigo_Producto = ?', [req.params.Codigo_Producto])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })
    res.send('Producto eliminado')
    } catch (error) {
        return res.status(500).json({
            message:'Algo salio mal'
        })
    }
}