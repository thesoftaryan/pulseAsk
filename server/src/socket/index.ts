export let onlineUsers = new Map<string, string>();

export const getUserSocket = (uid:string)=>{
    // console.log("==============================");
    // console.log("uid: ",uid)
    // for(let elem of onlineUsers){
    //     console.log(elem);
    // }
    // console.log("==============================");
    return onlineUsers.get(uid.toString());
}
