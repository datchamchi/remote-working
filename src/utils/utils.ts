export function converDate(isoDate: string) {
  const dateObj = new Date(isoDate);
  const formattedTime: string = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")} - ${String(dateObj.getDate()).padStart(2, "0")}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${dateObj.getFullYear()}`;
  return formattedTime;
}
