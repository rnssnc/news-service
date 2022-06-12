export const isToday = (date: Date) => {
  const otherDate = new Date(date);
  const todayDate = new Date();

  return (
    otherDate.getDate() === todayDate.getDate() &&
    otherDate.getMonth() === todayDate.getMonth() &&
    otherDate.getFullYear() === todayDate.getFullYear()
  );
};
