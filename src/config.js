import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_USER = process.env.DB_USER || 'root'
<<<<<<< HEAD
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
=======
export const DB_PASSWORD = process.env.DB_PASSWORD || 'Eclatbmx1'
>>>>>>> 669b914c8be9aba85497f50898f11d0871194637
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'puntoventa'
export const DB_PORT = process.env.DB_PORT || 3306

