import { pool } from '../db.js'
const{verify} = require('jsonwebtoken')
const jwt = require('jsonwebtoken')

export const postLogin = (req, res) => {
    const user = {
        idVendedor: 1,
        nombre: "Yael",
        Contraseña: 'achisfuga'
    }
    jwt.sing({user: user}, 'secretkey', {expiresIn: '32s'}, (err, token) => {
        res.json({
            token
        })
    })
}

export const posts = verifyToken = (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error) {
            res.sendStatus(403)
        } else {
            res.json({
                message:'Post fue creado',
                authData
            })
        }
    })
}