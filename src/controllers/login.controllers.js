import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const login = async (req, res) => {
  const username = req.body.Nom_Vendedor;
  const password = req.body.Contraseña;
  const sha1password = crypto.createHash("sha1").update(password).digest("hex");

  try {
    const [rows, fields] = await pool.query("SELECT * FROM vendedor WHERE Nom_Vendedor = ? AND Contraseña = ?", [username, sha1password]);

    if (rows.length === 1 && rows[0].Nom_Vendedor === username && rows[0].Contraseña === sha1password) {
      const user = rows[0];
      jwt.sign({ user: user }, "accesKey", { expiresIn: "24h" }, (err, token) => {
        if (err) throw err;
        const response = { 
          token: token,
          user: {
            id: user.idVendedor,
            username: user.Nom_Vendedor,
            idPermisos : user.idVendedor_Permisos
            
          }
        };
        res.json(response);
      });
    } else {
      res.status(403).json({ error: "Credenciales inválidas" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(503);
  }
};

