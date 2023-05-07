export const getFormattedDate = (dateToFormat: Date) => {
    const date = new Date(dateToFormat);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    console.log(date, year, month, day);
    return `${year}-${month}-${day}`;
};