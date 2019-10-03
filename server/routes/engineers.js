import express from 'express'
import Controller from '../controllers/engeneers'
import {getSections,getUsersBySection} from '../controllers/sections'


const controller = new Controller()
const router = express.Router()

router.post('/list',controller.getList)
router.get('/sections/:course',getSections)
router.get('/sections/:section/enrollments',getUsersBySection)

export default router


