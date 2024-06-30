import { Router } from 'express'

const loggerTestRouter = Router()

loggerTestRouter.get('/', (req, res) => {
    req.logger.debug('This is a debug log')
    req.logger.http('This is an HTTP log')
    req.logger.info('This is an info log')
    req.logger.warning('This is a warning log')
    req.logger.error('This is an error log')
    req.logger.fatal('This is a fatal log')
    
    res.send('Logger test completed')
})

export default loggerTestRouter
