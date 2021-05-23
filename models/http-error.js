class HttpError extends Error{
    constructor(message, error){
        super(message);             //Adds message
        this.code = error.code;     //Adds code
    }
}

module.exports = HttpError;