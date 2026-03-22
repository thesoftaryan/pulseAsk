export const formatDate = (time : Date):string =>{
    return time.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export const formatTime = (time : Date):string => {
    return time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

// for time formats like, 2h ago, 3h ago, 32d ago, 52w ago
export const relativeTimeFormat = (time : Date): string=>{
    const now = Date.now();
    const prev = new Date(time).getTime();
    const diff = Math.floor((now-prev)/1000);

    if (diff < 60) return `${diff}s ago`;

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