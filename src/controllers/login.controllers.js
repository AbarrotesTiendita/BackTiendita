
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const login = async (req, resp) => {
  var Nom_Vendedor = req.body.Nom_Vendedor;
  var Contraseña = req.body.Contraseña;

  pool.query(
    "select * from vendedor where Nom_Vendedor = ? and Contraseña = sha1(?)",
    [Nom_Vendedor, Contraseña],
    (err, rows) => {
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

// export default login;

