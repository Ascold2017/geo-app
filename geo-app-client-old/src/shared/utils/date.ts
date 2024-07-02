export const formatDDHHMM = (date: Date | string | number, isLongDayName?: boolean) => {
    const d = new Date(date);
        const daysShort = ["Вс", 'Пн', 'Вт', "Ср", "Чт", "Пт", "Сб",];
        const daysLong = ["Воскресень", 'Понедельник', 'Вторник', "Среда", "Четверг", "Пятница", "Суббота",]
        return `${(isLongDayName ? daysLong : daysShort)[d.getDay()]}, ${d.getHours()}:${d.getMinutes()}`
}