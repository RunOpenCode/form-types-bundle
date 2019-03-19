import Lightpick from 'lightpick';
import unserialize from '../../functions/unserialize.date-time-type.function';
import serialize from '../../functions/serialize.date-time-type.function';
export class DateType {
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
        let date = unserialize(this.el);
        this.picker = new Lightpick({
            field: this.input,
            format: this.dateFormat,
            singleDate: true,
            minDate: this.minDate,
            maxDate: this.maxDate,
            numberOfMonths: 1,
            numberOfColumns: 1,
            hoveringTooltip: false,
            disableWeekends: this.disableWeekends,
            onSelect: (date) => {
                serialize(this.el, date ? date.toDate() : null);
                this.change.emit(date);
            },
        });
        if (date) {
            this.picker.setDate(date);
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
        return this.picker.getDate();
    }
    async setValue(date) {
        this.picker.setDate(date);
        serialize(this.el, date);
        this.change.emit(date);
    }
    show(event) {
        this.picker.show();
        event.stopPropagation();
    }
    clear(event) {
        this.setValue(null);
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
    static get is() { return "runopencode-date-type"; }
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
        "getValue": {
            "method": true
        },
        "maxDate": {
            "type": "Any",
            "attr": "max-date"
        },
        "minDate": {
            "type": "Any",
            "attr": "min-date"
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
    static get style() { return "/**style-placeholder:runopencode-date-type:**/"; }
}
