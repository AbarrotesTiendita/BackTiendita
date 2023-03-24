import { pool } from "../db.js";
import bcryptjs from "bcrypt";

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


export const login = async (req, res) => {
  const user = req.body.Nom_Vendedor;
  const pass = req.body.Contraseña;
  if (user && pass) {
    pool.query("SELECT * FROM vendedor where Nom_Vendedor = ?", [user], async (error, results) => {
      if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
        res.status(401).send("Usuario y/o Contraseña Incorrecta");
      } else {
        req.session.loggedin = true;
        req.session.name = results[0].name;
        res.status(200).send("Login Correcto");
      }
    });
  } else {
    res.status(400).send("Por favor ingrese usuario y/o contraseña");
  }
};

export default login;

