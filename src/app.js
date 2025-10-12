import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// CORS (Cross-Origin Resource Sharing) is primarily used for security purposes. 
// It determines which origins are allowed to access the API and which ones should be blocked. 
// It also helps in handling credentials by verifying whether cookies, authorization headers, 
// or TLS client certificates are permitted to be shared between the client and server.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Middleware to parse incoming JSON requests with a maximum payload size of 16kb
app.use(express.json({ limit: "16kb" }))

// Middleware to parse URL-encoded data (e.g., when submitting forms).
// Example: A search for "LAVISH YADAV" would be represented in the URL as "LAVISH%20YADAV".
app.use(express.urlencoded({ extended: true }))

//Required to store images and other files or folder....
app.use(express.static("public"))
app.use(cookieParser())

//ABOVE 4 app.use is too important for setting the basic for any project 
// or you can say these are the basic Stambhh(pillars)



//routes import
import userRouter from './routes/user.router.js'


//routes declearation
app.use("/api/v1/users",userRouter)

export {app}
