import winston, { transports } from 'winston'
import config from '../configServer.js'
// import program from '../../process.js'

//solo disponibles black, red, green, yellow, blue, magenta, cyan, white, gray, grey

const customLevelsOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },

    colors: {
        debug: 'green',
        http: 'blue',
        info: 'cyan',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta'
    }
}

winston.addColors(customLevelsOptions.colors)

// logger development

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        }),
        /* new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            format:
                winston.format.simple()

        })
 */
    ]
})

//logger production

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: './errors.log', level: 'error' })
    ]

})

export const addLogger = (req,res,next) =>{
   

    if (config.enviroment === 'production') {
        
        req.logger = prodLogger

        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
    }else{
        req.logger = devLogger

        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
    }

    next()
}




