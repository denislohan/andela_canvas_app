import express from 'express'
import User from '../controllers/user'
const router = express.Router()



const user = new User()

router.post('/',user.registerOrLogin)
export default router


