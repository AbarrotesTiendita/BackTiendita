import express from 'express'
import vendedoresRoutes from './routes/vendedores.routes.js'
import productosRoutes from './routes/productos.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import indexRoutes from './routes/index.routes.js'
import ventasRoutes from './routes/ventas.routes.js'
import reporteRoutes from './routes/reporte.routes.js'
<<<<<<< HEAD
import proveedoresRoutes from './routes/proveedores.routes.js'


import cors from 'cors'

import { pool } from "./db.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

=======
import loginRoutes from './routes/usuarios.routes.js'
import proveedoresRoutes from './routes/proveedores.routes.js'

>>>>>>> 026f148b23fb01bdb31c3ae2d6503473dd584585

const app = express()
app.use(cors());
app.use(express.json())
app.use('/api',vendedoresRoutes)
app.use('/api',productosRoutes)
app.use('/api',categoriaRoutes)
app.use('/api',ventasRoutes)
app.use('/api',reporteRoutes)
<<<<<<< HEAD
=======
app.use('/api',loginRoutes)
>>>>>>> 026f148b23fb01bdb31c3ae2d6503473dd584585
app.use('/api', proveedoresRoutes)
app.use(indexRoutes)


app.post("/Login", (req, resp) => {
    
    var Nom_Vendedor = req.body.Nom_Vendedor;
    var Contraseña = req.body.Contraseña;
    // console.log(Matricula, Contraseña);
  
    pool.query(
      "select * from vendedor where Nom_Vendedor = ? and Contraseña = sha1(?)",
      [Nom_Vendedor, Contraseña],
      (err, rows, fields) => {
        console.log(rows);
        if (!err) {
          const hash = crypto.createHash("sha1").update(Contraseña).digest("hex");
          if (
            rows.length == 1 &&
            rows[0].Nom_Vendedor == Nom_Vendedor &&
            rows[0].Contraseña == hash
          ) {
            const user = rows[0];
            jwt.sign(
              { user: user },
              "accessKey",
              { expiresIn: "24h" },
              (err, token) => {
                resp.json({ token: token });
              }
            );
          } else {
            resp.sendStatus(403);
          }
        } else {
          resp.sendStatus(503);
        }
      }
    );
  });
export default app