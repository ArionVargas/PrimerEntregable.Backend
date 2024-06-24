import { Router } from "express"
import {sendEmail} from '../controlers/email.controller.js'

const router = Router()

router.get('/',sendEmail)
/* router.get('/attachments',sendEmailWithAttachments) */

export default router