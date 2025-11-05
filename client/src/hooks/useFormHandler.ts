import {useState} from "react";

export const useFormHandler = <T>(submitFunction:(data : T)=>Promise<void>)=>{
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async (data : T)=>{
        try{
            setLoading(true);
            setServerError(null);
            await submitFunction(data);
        }catch(e:any){
            setServerError(e.message);
        }finally{
            setLoading(false);
        }
    }

    return {handleSubmit, loading, serverError};
}