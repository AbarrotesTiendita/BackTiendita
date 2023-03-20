import { pool } from '../db.js'
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("./verifiToken");
const crypto = require('crypto');


export const postUsuarios = async (req, resp, next) => {
    const reqData={};
    var username = req.body.user;
    var password = req.body.pass;
    
    pool.query('select * from vendedor where Nom_Vendedor =? and Contraseña =sha1(?)',[username,password],(err,rows,field)=>{
        console.log(rows);
        if(!err){
            const hash=crypto.createHash('sha1').update(password).digest('hex');
            if(rows.length == 1 && rows[0].Nom_Vendedor == username && rows[0].Contraseña== hash){
                const user = rows[0];
                jwt.sign({id: user.idVendedor}, config.secret,{expiresIn:"24h"},(err,token)=>{
                    resp.json({token: token})
                });
            }
            else{
                resp.sendStatus(403);
            }
        }
        else{
            resp.sendStatus(503)
        }
    });
}

