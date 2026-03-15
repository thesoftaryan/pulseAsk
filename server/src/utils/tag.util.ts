import slugify from "slugify";


export const slugifyTag = (name:string) : string =>{
    return slugify(name, {
        lower: true,
        trim: true,
        strict: true,
    });
}

export const generateTagColor = (slug:string) : string =>{
    let hash=0;
    for(let i=0; i<slug.length; i++){
        hash = slug.charCodeAt(i) + ((hash<<5)-hash);
    }
    const hue = Math.abs(hash%360);
    const saturation = 65;
    const lightness=55;
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}