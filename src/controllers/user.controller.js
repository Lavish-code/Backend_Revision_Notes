import {asyncHandler} from '../utils/asyncHandler.js'


const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message :"Yes Lavish, it's working!!!"
    })
})

export {registerUser}