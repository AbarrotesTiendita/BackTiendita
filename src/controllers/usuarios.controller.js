import { pool } from '../db.js'

export const postUsuarios = async (req, resp, next) => {
    const reqData={};
    var username = req.body.user;
    var password = req.body.pass;
    
    database.query('select * from vendedor where Nom_Vendedor =? and Contraseña =sha1(?)',[username,password],(err,rows,field)=>{
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

