const asyncHandler = (requestHandler)=>{
    return (req , res , next) =>{
        Promise.resolve(requestHandler(req , res , next)).catch((error)=> next("this is your error => " +error))
    }
}

export default asyncHandler