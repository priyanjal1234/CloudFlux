import express from "express";
import {  connectToAWS } from "../controllers/aws.controller.js";

const router = express.Router();

router.post("/connect", connectToAWS);


export default router;
