export const formatDate = (time : Date):string =>{
    time = new Date(time);
    return time.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export const formatTime = (time : Date):string => {
    time = new Date(time);
    return time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

// for date formats like, today, yesterday, prevDayName(e.g. Wednesday), Thursday, ..., Tuesday, "April 12, 2026", ...
export const relativeTimeFormat = (time : Date): string=>{
    const now = Date.now();
    const prev = new Date(time).getTime();
    const diff = Math.floor((now-prev)/1000);

    if (diff < 60){
        if(diff < 30){
            return "few seconds ago"
        }
        return `${diff}s ago`;
    }

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(days / 365);
    return `${years}y ago`;
}

export const relativeDateFormat = (time : Date): string=>{
    time = new Date(time);
    const currTime = (new Date(Date.now()));

    const today = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate());
    const target = new Date(time.getFullYear(), time.getMonth(), time.getDate());

    const diffInMs = today.getTime() - target.getTime();
    const diffInDays = diffInMs / (1000*60*60*24);

    if(diffInDays == 0) return "   Today   ";
    if(diffInDays == 1) return " Yesterday ";

    if(diffInDays<7){
        return time.toLocaleDateString("en-US", {weekday: "long"});
    }

    return formatDate(time);
}