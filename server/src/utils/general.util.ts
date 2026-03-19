import slugify from "slugify";

export const slugifyText = (name:string) : string =>{
    return slugify(name, {
        lower: true,
        trim: true,
        strict: true,
    });
}