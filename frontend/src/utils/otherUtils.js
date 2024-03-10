export const getLocalDateString = (createdAt) => {
  const dateObject = new Date(createdAt);
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = dateObject.toLocaleString("default", { month: "long" });
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours() % 12 || 12;
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");
  const amPm = dateObject.getHours() >= 12 ? "PM" : "AM";
  return `${day} ${month} ${year} at ${hours}:${minutes}:${seconds} ${amPm}`;
};
