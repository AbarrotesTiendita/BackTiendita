import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_USER = process.env.DB_USER || 'root'
<<<<<<< HEAD
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
=======
export const DB_PASSWORD = process.env.DB_PASSWORD || '211068'
>>>>>>> 4bcf9a9cca7663b79f0fb8f22be995b6676511ea
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'puntoventa'
export const DB_PORT = process.env.DB_PORT || 3306

