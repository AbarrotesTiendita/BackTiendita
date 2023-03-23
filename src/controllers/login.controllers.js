import { pool } from "../db.js";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

export const login = async (req, res) => {
  var Nom_Vendedor = req.body.Nom_Vendedor;
  var Contraseña = req.body.Contraseña;

  pool.query(
    "select * from vendedores where Nom_Vendedor = ? and Contraseña = sha1(?)",
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
};

export default login;
