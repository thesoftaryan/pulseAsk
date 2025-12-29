export class ApiError extends Error{
    public statusCode : number;
    public details : string;

    constructor(statusCode : number, message : string, details : string){
        super(message);
        this.statusCode = statusCode;
        this.details = details;

        //JavaScript lies about inheritance for built-in objects.
        // This line tells the truth back to the runtime.
        // Without this line any instance of ApiError will 
        // not be considered the instance of ApiError but the
        // instance of only Error.
        Object.setPrototypeOf(this, ApiError.prototype);
    }

}