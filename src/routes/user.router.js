import {Router} from "express"
import  {changeCurrentPassword, getCurrentUser, logInUser, logOutUser, refreshAccessToken, registerUser}  from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"



const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    registerUser
)
router.route("/login").post(logInUser)

//secured route
router.route("/logout").post(verifyJWT , logOutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/reset-password").post(changeCurrentPassword)
router.route("/get-user").get(verifyJWT , getCurrentUser)


export default router