import express from 'express'
import { checkConnection } from '../controllers/connection.controller.js'
const router = express.Router()

router.post("/check-connection",checkConnection)

export default router