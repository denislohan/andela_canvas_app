import express from 'express'
import Controller from '../controllers/engeneers'


const controller = new Controller()
const router = express.Router()

router.post('/list',controller.getList)
router.get('/data/week',controller.getWeekData)

export default router


