import { h } from '../runopencode.core.js';

import { a as unserialize, b as Lightpick, c as serialize } from './chunk-7c8f964f.js';

class DateRangeType {
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
    static get style() { return ".lightpick{position:absolute;z-index:99999;padding:4px;border-radius:4px;background-color:#fff;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25);color:#000;font-family:system-ui,Roboto,Helvetica,Arial,sans-serif;line-height:1.125em}.lightpick--inlined{position:static}.lightpick,.lightpick *,.lightpick:after,.lightpick:before{-webkit-box-sizing:border-box;box-sizing:border-box}.lightpick.is-hidden{display:none}.lightpick__months{display:grid;background-color:#eee;grid-template-columns:auto;grid-gap:1px}.lightpick--2-columns .lightpick__months{grid-template-columns:auto auto}.lightpick--3-columns .lightpick__months{grid-template-columns:auto auto auto}.lightpick--4-columns .lightpick__months{grid-template-columns:auto auto auto auto}.lightpick--5-columns .lightpick__months{grid-template-columns:auto auto auto auto auto}.lightpick__month{padding:4px;width:288px;background-color:#fff}.lightpick__month-title-bar{display:-ms-flexbox;display:flex;margin-bottom:4px;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}.lightpick__month-title{margin-top:4px;margin-bottom:4px;margin-left:4px;font-size:16px;font-weight:400;line-height:24px;cursor:default;padding:0 4px;border-radius:4px}.lightpick__month .lightpick__month-title:hover{background-color:#eee}.lightpick__month-title-accent{font-weight:700;pointer-events:none}.lightpick__toolbar{display:-ms-flexbox;display:flex;text-align:right;-ms-flex-pack:end;justify-content:flex-end}.lightpick__close-action,.lightpick__next-action,.lightpick__previous-action{display:-ms-flexbox;display:flex;margin-left:6px;width:32px;height:32px;outline:none;border:none;border-radius:50%;background-color:#ddd;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.lightpick__next-action,.lightpick__previous-action{font-size:12px}.lightpick__close-action{font-size:18px}.lightpick__close-action:active,.lightpick__next-action:active,.lightpick__previous-action:active{color:inherit}.lightpick__days-of-the-week{display:grid;grid-template-columns:repeat(7,1fr)}.lightpick__day-of-the-week{display:-ms-flexbox;display:flex;font-size:11px;font-weight:700;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.lightpick__days{display:grid;grid-template-columns:repeat(7,1fr)}.lightpick__day{display:-ms-flexbox;display:flex;height:40px;background-position:50%;background-size:contain;background-repeat:no-repeat;font-size:13px;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;cursor:default}.lightpick__day.is-today{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='rgba(220, 50, 47, 0.06)' cx='16' cy='16' r='16'/%3E%3C/svg%3E\");background-size:61.8% auto;color:#dc322f}.lightpick__day:not(.is-disabled):hover{background-size:contain;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='%23E0E0E0' cx='16' cy='16' r='16'/%3E%3C/svg%3E\")}.lightpick__day.is-disabled{opacity:.38;pointer-events:none}.lightpick__day.disabled-tooltip{pointer-events:auto}.lightpick__day.is-disabled.is-forward-selected{opacity:1}.lightpick__day.is-disabled.is-forward-selected:not(.is-start-date){background-color:rgba(38,139,210,.1);background-image:none}.lightpick__day.is-next-month,.lightpick__day.is-previous-month{opacity:.38}.lightpick__day.lightpick__day.is-in-range:not(.is-disabled){opacity:1}.lightpick__day.is-in-range{border-radius:0;background-color:rgba(38,139,210,.1);background-image:none}.lightpick__day.is-in-range:hover{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='rgba(38, 139, 210, 0.5)' cx='16' cy='16' r='16'/%3E%3C/svg%3E\")}.lightpick__day.is-end-date.is-in-range.is-flipped,.lightpick__day.is-start-date.is-in-range{border-top-left-radius:50%;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:50%;background-color:#268bd2;background-image:none}.lightpick__day.is-end-date.is-in-range,.lightpick__day.is-start-date.is-in-range.is-flipped{border-top-left-radius:0;border-top-right-radius:50%;border-bottom-right-radius:50%;border-bottom-left-radius:0;background-color:#268bd2;background-image:none}.lightpick__day.is-start-date.is-end-date{background-color:transparent}.lightpick__day.is-end-date,.lightpick__day.is-end-date:hover,.lightpick__day.is-start-date,.lightpick__day.is-start-date.is-end-date,.lightpick__day.is-start-date:hover{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='%23268BD2' cx='16' cy='16' r='16'/%3E%3C/svg%3E\")}.lightpick__day.is-end-date,.lightpick__day.is-end-date:hover,.lightpick__day.is-start-date,.lightpick__day.is-start-date:hover{color:#fff;font-weight:700}.lightpick__tooltip{position:absolute;margin-top:-4px;padding:4px 8px;border-radius:4px;background-color:#fff;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25);white-space:nowrap;font-size:11px;pointer-events:none}.lightpick__tooltip:before{position:absolute;bottom:-5px;left:calc(50% - 5px);border-top:5px solid rgba(0,0,0,.12);border-right:5px solid transparent;border-left:5px solid transparent;content:\"\"}.lightpick__tooltip:after{position:absolute;bottom:-4px;left:calc(50% - 4px);border-top:4px solid #fff;border-right:4px solid transparent;border-left:4px solid transparent;content:\"\"}.lightpick__months-of-the-year{padding:4px;background-color:#fff}.lightpick__months-of-the-year-list{display:grid;grid-template-columns:auto auto auto;grid-gap:8px}.lightpick__month-of-the-year{padding:0 10px;text-align:center;border-radius:3px;-webkit-box-shadow:inset -1px -1px 1px 1px #e0e0e0;box-shadow:inset -1px -1px 1px 1px #e0e0e0;cursor:default;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.lightpick__month-of-the-year>div:first-child{padding:10px 0 2px 0;font-size:.9em;pointer-events:none}.lightpick__month-of-the-year>div:last-child{font-size:.7em;color:#bbb;padding:2px 0 10px 0;pointer-events:none}.lightpick__month-of-the-year:hover{background-color:#e0e0e0;background-image:none}.lightpick__footer{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.lightpick__apply-action,.lightpick__reset-action{border-radius:5px;font-size:12px;border:none}.lightpick__reset-action{color:#fff;background-color:#aeacad}.lightpick__apply-action{color:#fff;background-color:#2495f3}"; }
}

export { DateRangeType as RunopencodeDateRangeType };
