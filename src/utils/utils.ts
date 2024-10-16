export function converDate(isoDate: string) {
  const dateObj = new Date(isoDate);
  const formattedTime: string = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")} - ${String(dateObj.getDate()).padStart(2, "0")}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${dateObj.getFullYear()}`;
  return formattedTime;
}

export function timeAgo(date: Date) {
  const now = new Date();
  const seconds = Math.floor((Number(now) - Number(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `About ${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now"; // Nếu thời gian quá ngắn
}
