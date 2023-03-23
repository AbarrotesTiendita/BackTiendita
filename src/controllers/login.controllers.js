import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, resp) => {
  const { Nom_Vendedor, Contraseña } = req.body;

  pool.query(
    "SELECT * FROM vendedor WHERE Nom_Vendedor = ?",
    [Nom_Vendedor],
    async (err, rows, fields) => {
      if (err) {
        console.log(err);
        return resp.sendStatus(503);
      }

      if (rows.length !== 1) {
        return resp.sendStatus(403);
      }

      const user = rows[0];
      const match = await bcrypt.compare(Contraseña, user.Contraseña);

      if (match) {
        const token = jwt.sign({ user }, "accessKey");
        return resp.json({ token });
      } else {
        return resp.sendStatus(403);
      }
    }
  );
};

export default login;
