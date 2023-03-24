import { pool } from "../db.js";
import bcrypt from "bcrypt";

/* export const login = async (req, resp,) => {
  var Nom_Vendedor = req.body.Nom_Vendedor;
  var Contraseña = req.body.Contraseña;

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
}; */


export const login = async  (req, res) => {
  const { Nom_Vendedor, Contraseña } = req.body;

  // Consulta para recuperar el idVendedor y la Contraseña correspondientes al Nom_Vendedor
  const query = `SELECT idVendedor, Contraseña FROM vendedor WHERE Nom_Vendedor = '${Nom_Vendedor}'`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    if (results.length === 0) {
      res.status(401).json({ error: 'El nombre de usuario o la contraseña son incorrectos' });
      return;
    }

    const idVendedor = results[0].idVendedor;
    const storedPassword = results[0].Contraseña;

    if (Contraseña !== storedPassword) {
      res.status(401).json({ error: 'El nombre de usuario o la contraseña son incorrectos' });
      return;
    }

    // Si la autenticación es exitosa, generar un token de autenticación
    const token = generateAuthToken(idVendedor);
    res.json({ token });
  });
}

// Función para generar un token de autenticación simple
function generateAuthToken(idVendedor) {
  return `Bearer ${idVendedor}`;
}

export default login;
