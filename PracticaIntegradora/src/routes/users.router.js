import { Router } from "express"
import { userModel } from "../models/users.model.js"


const router = Router()

//GET
router.get('/', async (req, res) => {
try {
    let users = await userModel.find()
    
} catch (error) {
    console.error("Failed to get users" + error )
    res.status(500).send("Error interno del servidor")
}

})


//POST


//PUT



//DELETE

