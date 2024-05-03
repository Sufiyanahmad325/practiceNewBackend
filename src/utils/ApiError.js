class ApiError extends Error{
    constructor(
        statusCode,
        messsage="something went wrong",
        errors=[],
        stack=''

    ){
        super(messsage)
        this.statusCode=statusCode
        this.data=null
        this.message=messsage
        this.success = false
        this.errors=errors

        if(stack){
            this.stack= stack
        }else{
            console.log(stack);
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export default ApiError