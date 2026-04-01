export const isValidEmail = (email:string) : boolean => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}   

export const isStrongPassword = (password:string) : boolean => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return pattern.test(password);
}

export const isValidName = (name:string) : boolean => {
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(name);
}

export const isValidUserName = (userName:string) : boolean =>{
    const pattern = /^[a-zA-Z0-9][a-zA-Z0-9_-]{1,18}[a-zA-Z0-9]$/;
    return pattern.test(userName);
}

// Checks for special characters (except '.') and digits in a string
export const isSpecialNumericString = (str : string):boolean=>{
    const pattern = /[^a-zA-Z0-9.\s]/;
    return pattern.test(str);
}

export const isValidURL = (url:string):boolean=>{
    try{
        new URL(url);
        return true;
    }catch(err){
        return false;
    }
}