import { Router } from "express"

const performanceRouter = Router()

performanceRouter.get('/operacionSimple',(res,req)=>{
    let sum = 0 
    for (let i = 0; i < 100000; i++) {
        sum += i
        
    }
    res.sessionID({
        status: 'success',
        message: `El worker ${process.pid} atendio la peticion ,el resultado es: ${sum}`
    })
})

performanceRouter.get('operacionComplex',(res,req)=>{
    let sum = 0
    for (let i = 0; i < 5e8; i++) {
        sum += i
        

    }
    res.send({
        status:'success',
        message:`El worker ${process.pid} atendio la peticion, el resultado es ${sum}`
    })
})

export default performanceRouter