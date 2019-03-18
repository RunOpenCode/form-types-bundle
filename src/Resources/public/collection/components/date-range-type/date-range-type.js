import Lightpick from 'lightpick';
import unserialize from '../../functions/unserialize.date-time-type.function';
import serialize from '../../functions/serialize.date-time-type.function';
export class DateRangeType {
    constructor() {
        this.dateFormat = 'DD/MM/YYYY';
        this.theme = 'bootstrap4';
        this.disableWeekends = false;
        this.minDate = null;
        this.maxDate = null;
        this.placeholder = null;
        this.disabled = false;
        this.readonly = false;
        this.required = false;
        this.numberOfMonths = 2;
        this.minDays = null;
        this.maxDays = null;
        this.themes = {
            'bootstrap4': this.renderBoostrap4Theme,
        };
    }
    hostData() {
        return {
            'class': {
                [this.theme]: true,
            },
        };
    }
    componentDidLoad() {
        this.input = this.el.querySelector('input[type="text"]');
        let from = unserialize(this.el, 'from');
        let to = unserialize(this.el, 'to');
        this.picker = new Lightpick({
            field: this.input,
            singleDate: false,
            minDate: this.minDate,
            maxDate: this.maxDate,
            minDays: this.minDays,
            maxDays: this.maxDays,
            format: this.dateFormat,
            numberOfMonths: this.numberOfMonths,
            numberOfColumns: this.numberOfMonths,
            hoveringTooltip: false,
            disableWeekends: this.disableWeekends,
            onSelect: (start, end) => {
                from = start ? start.toDate() : null;
                to = end ? end.toDate() : null;
                serialize(this.el, from, 'from');
                serialize(this.el, to, 'to');
                this.change.emit([from, to]);
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
        if (this.themes[this.theme]) {
            return this.themes[this.theme].apply(this, []);
        }
        throw new Error(`Theme "${this.theme}" is not supported.`);
    }
    async getValue() {
        return [
            this.picker.getStartDate(),
            this.picker.getEndDate(),
        ];
    }
    async getDateFrom() {
        return this.picker.getStartDate();
    }
    async getDateTo() {
        return this.picker.getEndDate();
    }
    async setValue(from, to) {
        this.picker.setDateRange(from, to);
        serialize(this.el, from, 'from');
        serialize(this.el, to, 'to');
        this.change.emit([from, to]);
    }
    async setDateFrom(from) {
        let to = this.picker.getEndDate() ? this.picker.getEndDate().toDate() : null;
        this.setValue(from, to);
    }
    async setDateTo(to) {
        let from = this.picker.getStartDate() ? this.picker.getStartDate().toDate() : null;
        this.setValue(from, to);
    }
    show(event) {
        this.picker.show();
        event.stopPropagation();
    }
    clear(event) {
        this.setValue(null, null);
        event.stopPropagation();
    }
    renderBoostrap4Theme() {
        return [
            h("div", null,
                h("div", { class: "input-group" },
                    h("input", { type: "text", readonly: this.readonly, disabled: this.disabled, required: this.required, placeholder: this.placeholder, class: "form-control" }),
                    h("div", { class: "input-group-append" },
                        h("span", { class: "input-group-text", onClick: (event) => this.show.bind(this)(event) },
                            h("i", { class: "far fa-calendar-alt" })),
                        this.required
                            ?
                                ''
                            :
                                h("span", { class: "input-group-text", onClick: (event) => this.clear.bind(this)(event) },
                                    h("i", { class: "fas fa-times" })))),
                h("div", { class: "hidden", hidden: true },
                    h("slot", null))),
        ];
    }
    static get is() { return "runopencode-date-range-type"; }
    static get properties() { return {
        "dateFormat": {
            "type": String,
            "attr": "date-format"
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
        "getDateFrom": {
            "method": true
        },
        "getDateTo": {
            "method": true
        },
        "getValue": {
            "method": true
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
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "setDateFrom": {
            "method": true
        },
        "setDateTo": {
            "method": true
        },
        "setValue": {
            "method": true
        },
        "theme": {
            "type": String,
            "attr": "theme"
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:runopencode-date-range-type:**/"; }
}
