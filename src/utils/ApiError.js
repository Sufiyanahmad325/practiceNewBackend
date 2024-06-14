class ApiError extends Error{
    constructor(
        stutusCode ,
        message=" something went wrong",
        errors=[],
        stack=''
    ){
        super(message)
        this.stutusCode = stutusCode
        this.data= null
        this.success= false 
        this.error= errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}


export default ApiError