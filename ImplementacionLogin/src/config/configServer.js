import dotenv from 'dotenv'
import program from '../process.js'



const environment = program.opts().mode

/* dotenv.config() */

/* console.log(process.env.SERVER_PORT)
console.log(process.env.ADMIN) */



dotenv.config({
    path: environment === 'production' ? './src/config/.env.production' : './src/config/.env.development'
})

export default {
    port: process.env.SERVER_PORT,
    mongoURL: process.env.MONGO_URL,
}
// CON ENV VAR 
/* import {get} from 'env-var' */
/* import pkg from 'env-var'
const {get} = pkg */


/* const { get } = envVar */


/* export const envs = {
    PORT: get('SERVER_PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString()
} */