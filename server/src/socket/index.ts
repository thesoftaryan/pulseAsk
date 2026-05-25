export const onlineUsers = new Map<string, string>();

export const getUserSocket = (uid:string)=>onlineUsers.get(uid);
