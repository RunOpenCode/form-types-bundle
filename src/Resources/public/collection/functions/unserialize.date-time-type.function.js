export default function unserialize(context, field) {
    field = field ? `[${field}]` : '';
    let yearElement = context.querySelector(`[name$="${field}[year]"]`);
    let monthElement = context.querySelector(`[name$="${field}[month]"]`);
    let dayElement = context.querySelector(`[name$="${field}[day]"]`);
    let hourElement = context.querySelector(`[name$="${field}[hour]"]`);
    let minuteElement = context.querySelector(`[name$="${field}[minute]"]`);
    let secondElement = context.querySelector(`[name$="${field}[second]"]`);
    let year = yearElement.selectedIndex !== -1 ? yearElement[yearElement.selectedIndex].value : null;
    let month = monthElement.selectedIndex !== -1 ? monthElement[monthElement.selectedIndex].value : null;
    let day = dayElement.selectedIndex !== -1 ? dayElement[dayElement.selectedIndex].value : null;
    let hour = null;
    let minute = null;
    let second = null;
    if (hourElement) {
        hour = hourElement.selectedIndex !== -1 ? yearElement[hourElement.selectedIndex].value : null;
    }
    if (minuteElement) {
        minute = minuteElement.selectedIndex !== -1 ? yearElement[minuteElement.selectedIndex].value : null;
    }
    if (secondElement) {
        second = secondElement.selectedIndex !== -1 ? yearElement[secondElement.selectedIndex].value : null;
    }
    if (!year || !month || !day) {
        return null;
    }
    if (hourElement && !hour) {
        return null;
    }
    if (minuteElement && !minute) {
        return null;
    }
    if (secondElement && !second) {
        return null;
    }
    return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), hour ? parseInt(hour, 10) : null, minute ? parseInt(minute, 10) : null, second ? parseInt(second, 10) : null);
}
