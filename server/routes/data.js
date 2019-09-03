import express from 'express'
import Controller from '../controllers/engeneers'


const controller = new Controller()
const router = express.Router()

router.get('/week',controller.getWeekData)
export default router


