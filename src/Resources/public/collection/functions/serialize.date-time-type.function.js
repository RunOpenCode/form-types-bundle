/**
 * Serialize date/time object into Symfony's selects of Date/DateTime picker
 */
export default function serialize(context, value, field) {
    field = field ? `[${field}]` : '';
    let yearElement = context.querySelector(`[name$="${field}[year]"]`);
    let monthElement = context.querySelector(`[name$="${field}[month]"]`);
    let dayElement = context.querySelector(`[name$="${field}[day]"]`);
    let hourElement = context.querySelector(`[name$="${field}[hour]"]`);
    let minuteElement = context.querySelector(`[name$="${field}[minute]"]`);
    let secondElement = context.querySelector(`[name$="${field}[second]"]`);
    let clear = function (select) {
        while (select.options.length > 0) {
            select.options.remove(0);
        }
    };
    let set = function (select, value) {
        let option = document.createElement('option');
        option.value = value;
        option.text = value;
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
