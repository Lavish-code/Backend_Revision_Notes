//ASYNCHANDLER :- used as a wrapper function that catches the error and 
// prevent the system from getting crash


//FIRST WAY TO DEFINCE ASYNCHANDLER 
/*const asyncHandler = (func) => async(req, res, next) => {
    try {
        await func(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}*/

//SECOND WAY TO DEFINE ASYNCHANDLER 

const asyncHandler = (requestHandler) =>{
    return (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}

export {asyncHandler};