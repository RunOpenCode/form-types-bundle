/**
 * Serialize date/time object into Symfony's selects of Date/DateTime picker
 */
export default function serialize(context: HTMLElement, value: Date | null, field?: string) {

    field = field ? `[${field}]` : '';

    let yearElement: HTMLSelectElement   = (context.querySelector(`[name$="${field}[year]"]`) as HTMLSelectElement);
    let monthElement: HTMLSelectElement  = (context.querySelector(`[name$="${field}[month]"]`) as HTMLSelectElement);
    let dayElement: HTMLSelectElement    = (context.querySelector(`[name$="${field}[day]"]`) as HTMLSelectElement);
    let hourElement: HTMLSelectElement   = (context.querySelector(`[name$="${field}[hour]"]`) as HTMLSelectElement);
    let minuteElement: HTMLSelectElement = (context.querySelector(`[name$="${field}[minute]"]`) as HTMLSelectElement);
    let secondElement: HTMLSelectElement = (context.querySelector(`[name$="${field}[second]"]`) as HTMLSelectElement);
    let clear                            = function (select: HTMLSelectElement) {

        while (select.options.length > 0) {
            select.options.remove(0);
        }
    };

    let set = function (select: HTMLSelectElement, value: string) {
        let option: HTMLOptionElement = (document.createElement('option') as HTMLOptionElement);
        option.value                  = value;
        option.text                   = value;

        select.add(option);
        select.selectedIndex = 0;
    };

    clear(dayElement);
    clear(monthElement);
    clear(yearElement);

    if (hourElement) {
        clear(hourElement);
    }

    if (minuteElement) {
        clear(minuteElement);
    }

    if (secondElement) {
        clear(secondElement);
    }

    if (!value) {
        return;
    }

    set(dayElement, value.getDate().toString());
    set(monthElement, (value.getMonth() + 1).toString());
    set(yearElement, value.getFullYear().toString());

    if (hourElement) {
        set(hourElement, value.getHours().toString());
    }

    if (minuteElement) {
        set(minuteElement, value.getMinutes().toString());
    }

    if (secondElement) {
        set(secondElement, value.getSeconds().toString());
    }
}
