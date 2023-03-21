import { pool } from '../db.js'
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


export const postUsuarios = async (req, resp, next) => {
    const reqData={};
    const username = req.body.Nom_Vendedor;
    const password = req.body.Contraseña;
    try {
        const [rows] = await pool.query('SELECT * FROM vendedor WHERE Nom_Vendedor = ?', [username]);
        if(rows.length == 0 || !(await bcryptjs.compare(password, rows[0].Contraseña))){
            const user = rows[0];
            const token = jwt.sign({ id: user.idVendedor }, 'mysecretkey', { expiresIn: '24h' });
            resp.json({ token });
        } else {
            resp.sendStatus(403);
        }
    } catch (err) {
        console.error(err);
        resp.sendStatus(503);
    }
};


