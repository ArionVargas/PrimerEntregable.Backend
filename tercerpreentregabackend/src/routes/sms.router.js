import { Router } from "express"
import {sendSMS} from '../controlers/sms.controller.js'

const router = Router()

router.get('/',sendSMS)

export default router