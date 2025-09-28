import express from "express";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json());

app.listen (PORT , ()=>{
    console.log(`App listening on PORT: ${PORT}`)
})

connectDB()