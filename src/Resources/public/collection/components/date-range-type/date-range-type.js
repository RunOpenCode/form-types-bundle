import Lightpick from 'lightpick';
export class DateRangeType {
    constructor() {
        this.format = 'DD/MM/YYYY';
        this.numberOfMonths = 2;
        this.buttons = false;
        this.disableWeekends = false;
        this.minDate = null;
        this.maxDate = null;
        this.minDays = null;
        this.maxDays = null;
        this.disabled = false;
        this.readonly = false;
        this.required = false;
        this.inputClass = '';
    }
    componentWillLoad() {
        this.cssClasses = this.el.getAttribute('class');
        this.cssStyle = this.el.getAttribute('style');
    }
    componentDidLoad() {
        this.input = this.el.querySelector('input[type="text"]');
        let from = this.unserialize('from');
        let to = this.unserialize('to');
        let serialize = this.serialize.bind(this);
        this.picker = new Lightpick({
            field: this.input,
            singleDate: false,
            minDate: this.minDate,
            maxDate: this.maxDate,
            minDays: this.minDays,
            maxDays: this.maxDays,
            footer: this.buttons,
            format: this.format,
            numberOfMonths: this.numberOfMonths,
            numberOfColumns: this.numberOfMonths,
            hoveringTooltip: false,
            disableWeekends: this.disableWeekends,
            onSelect: (start, end) => {
                serialize('from', start ? start.toDate() : null);
                serialize('to', end ? end.toDate() : null);
            },
        });
        if (from || to) {
            this.picker.setDateRange(from, to);
        }
        if (this.cssClasses) {
            this.cssClasses.split(' ').forEach((cssClass) => {
                this.el.classList.remove(cssClass);
                this.input.classList.add(cssClass);
            });
        }
        if (this.cssStyle) {
            this.input.setAttribute('style', this.cssStyle);
            this.el.setAttribute('style', this.cssStyle);
        }
    }
    componentDidUnload() {
        if (this.cssClasses) {
            this.el.className = this.cssClasses;
        }
        if (this.cssStyle) {
            this.el.setAttribute('style', this.cssStyle);
        }
        this.picker.destroy();
    }
    render() {
        return [
            h("div", null,
                h("input", { type: "text", class: this.inputClass, readonly: this.readonly, disabled: this.disabled, required: this.required }),
                !this.required
                    ? h("span", null, "Close")
                    : '',
                h("div", { class: "hidden", hidden: true },
                    h("slot", null))),
        ];
    }
    unserialize(field) {
        let dayElement = this.el.querySelector(`[name$="[${field}][day]"]`);
        let monthElement = this.el.querySelector(`[name$="[${field}][month]"]`);
        let yearElement = this.el.querySelector(`[name$="[${field}][year]"]`);
        let day = dayElement.selectedIndex !== -1 ? dayElement[dayElement.selectedIndex].value : null;
        let month = monthElement.selectedIndex !== -1 ? monthElement[monthElement.selectedIndex].value : null;
        let year = yearElement.selectedIndex !== -1 ? yearElement[yearElement.selectedIndex].value : null;
        if (!day) {
            return null;
        }
        if (!month) {
            return null;
        }
        if (!year) {
            return null;
        }
        return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    }
    serialize(field, value) {
        let dayElement = this.el.querySelector(`[name$="[${field}][day]"]`);
        let monthElement = this.el.querySelector(`[name$="[${field}][month]"]`);
        let yearElement = this.el.querySelector(`[name$="[${field}][year]"]`);
        dayElement.selectedIndex = -1;
        monthElement.selectedIndex = -1;
        yearElement.selectedIndex = -1;
        if (!value) {
            return;
        }
        dayElement.querySelector(`option[value="${value.getDate()}"]`).selected = true;
        monthElement.querySelector(`option[value="${value.getMonth() + 1}"]`).selected = true;
        yearElement.querySelector(`option[value="${value.getFullYear() + 1}"]`).selected = true;
    }
    static get is() { return "runopencode-date-range-type"; }
    static get properties() { return {
        "buttons": {
            "type": Boolean,
            "attr": "buttons"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "disableWeekends": {
            "type": Boolean,
            "attr": "disable-weekends"
        },
        "el": {
            "elementRef": true
        },
        "format": {
            "type": String,
            "attr": "format"
        },
        "inputClass": {
            "type": String,
            "attr": "input-class"
        },
        "maxDate": {
            "type": "Any",
            "attr": "max-date"
        },
        "maxDays": {
            "type": Number,
            "attr": "max-days"
        },
        "minDate": {
            "type": "Any",
            "attr": "min-date"
        },
        "minDays": {
            "type": Number,
            "attr": "min-days"
        },
        "numberOfMonths": {
            "type": Number,
            "attr": "number-of-months"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        }
    }; }
    static get style() { return "/**style-placeholder:runopencode-date-range-type:**/"; }
}
