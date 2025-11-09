export const isValidEmail = (email:string) : boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}   

export const isStrongPassword = (password:string) : boolean => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return pattern.test(password);
}

export const isValidName = (name:string) : boolean => {
    const pattern = /[a-zA-Z].*/;
    return pattern.test(name);
}