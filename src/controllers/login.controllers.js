import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, resp) => {
  const nom_vendedor = req.body.nom_vendedor;
  const password = req.body.password;

  pool.query(
    "SELECT * FROM vendedor WHERE nom_vendedor = ?",
    [nom_vendedor],
    async (err, rows, fields) => {
      if (!err) {
        if (rows.length === 1) {
          const match = await bcrypt.compare(password, rows[0].contraseña);
          if (match) {
            const user = rows[0];
            jwt.sign(
              { user: user },
              "accessKey",
              (err, token) => {
                if (err) {
                  resp.sendStatus(500);
                } else {
                  resp.json({ token: token });
                }
              }
            );
          } else {
            resp.sendStatus(403);
          }
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

