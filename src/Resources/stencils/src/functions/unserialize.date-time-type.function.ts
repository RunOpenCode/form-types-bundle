/**
 * Unserialize date/time object from Symfony's selects of Date/DateTime picker
 */
export default function unserialize(context: HTMLElement, field?: string): Date | null {

    field = field ? `[${field}]` : '';

    let yearElement: HTMLSelectElement   = (context.querySelector(`[name$="${field}[year]"]`) as HTMLSelectElement);
    let monthElement: HTMLSelectElement  = (context.querySelector(`[name$="${field}[month]"]`) as HTMLSelectElement);
    let dayElement: HTMLSelectElement    = (context.querySelector(`[name$="${field}[day]"]`) as HTMLSelectElement);
    let hourElement: HTMLSelectElement   = (context.querySelector(`[name$="${field}[hour]"]`) as HTMLSelectElement);
    let minuteElement: HTMLSelectElement = (context.querySelector(`[name$="${field}[minute]"]`) as HTMLSelectElement);
    let secondElement: HTMLSelectElement = (context.querySelector(`[name$="${field}[second]"]`) as HTMLSelectElement);

    let year: string   = yearElement.selectedIndex !== -1 ? (yearElement[yearElement.selectedIndex] as HTMLOptionElement).value : null;
    let month: string  = monthElement.selectedIndex !== -1 ? (monthElement[monthElement.selectedIndex] as HTMLOptionElement).value : null;
    let day: string    = dayElement.selectedIndex !== -1 ? (dayElement[dayElement.selectedIndex] as HTMLOptionElement).value : null;
    let hour: string   = null;
    let minute: string = null;
    let second: string = null;

    if (hourElement) {
        hour = hourElement.selectedIndex !== -1 ? (yearElement[hourElement.selectedIndex] as HTMLOptionElement).value : null;
    }

    if (minuteElement) {
        minute = minuteElement.selectedIndex !== -1 ? (yearElement[minuteElement.selectedIndex] as HTMLOptionElement).value : null;
    }

    if (secondElement) {
        second = secondElement.selectedIndex !== -1 ? (yearElement[secondElement.selectedIndex] as HTMLOptionElement).value : null;
    }

    if (!year || !month || !day) {
        return null;
    }

    if (hourElement && !hour) {
        return null
    }

    if (minuteElement && !minute) {
        return null
    }

    if (secondElement && !second) {
        return null
    }

    return new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        hour ? parseInt(hour, 10) : null,
        minute ? parseInt(minute, 10) : null,
        second ? parseInt(second, 10) : null,
    );
}
