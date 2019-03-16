import Lightpick from 'lightpick';
export class DateRangeType {
    constructor() {
        this.numberOfMonths = 2;
        this.numberOfColumns = 2;
        this.minDate = null;
        this.maxDate = null;
        this.minDays = null;
        this.maxDays = null;
        this.footer = true;
        this.format = 'DD/MM/YYYY';
    }
    componentDidLoad() {
        let input = this.el.querySelector('input[type="text"]');
        let from = this.unserialize('from');
        let to = this.unserialize('to');
        let serialize = this.serialize.bind(this);
        this.picker = new Lightpick({
            field: input,
            singleDate: false,
            minDate: this.minDate,
            maxDate: this.maxDate,
            minDays: this.minDays,
            maxDays: this.maxDays,
            footer: this.footer,
            format: this.format,
            numberOfMonths: this.numberOfMonths,
            numberOfColumns: this.numberOfColumns,
            onSelect: (start, end) => {
                serialize('from', start ? start.toDate() : null);
                serialize('to', end ? end.toDate() : null);
            },
        });
        if (from || to) {
            this.picker.setDateRange(from, to);
        }
    }
    componentDidUnload() {
        this.picker.destroy();
    }
    render() {
        return [
            h("div", null,
                h("input", { type: "text" }),
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
        "el": {
            "elementRef": true
        },
        "footer": {
            "type": Boolean,
            "attr": "footer"
        },
        "format": {
            "type": String,
            "attr": "format"
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
        "numberOfColumns": {
            "type": Number,
            "attr": "number-of-columns"
        },
        "numberOfMonths": {
            "type": Number,
            "attr": "number-of-months"
        }
    }; }
    static get style() { return "/**style-placeholder:runopencode-date-range-type:**/"; }
}
