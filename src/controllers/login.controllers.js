
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const login = async(req, resp) => {
  var username = req.body.Nom_Vendedor;
  var pass = req.body.Contraseña;

  await pool.query("select * from vendedor where Nom_Vendedor=? and Contraseña = sha1(?)",[username,pass],(err,rows,fields)=>{
    console.log(rows);
    if(!err){
      const hash = crypto.createHash("sha1").update(pass).digest("hex");
      if(rows.lenght == 1 && rows[0].Nom_Vendedor == username && rows[0].Contraseña == hash){
        const user = rows[0];
        jwt.sign({user:user}, "accesKey", {expiresIn: "24h"}, (err,token)=>{
          resp.json({token: token})
        });
      }
      else{
        resp.sendStatus(403);
      }
    }
    else{
      resp.sendStatus(503);
    }
  });
};

export default login;

