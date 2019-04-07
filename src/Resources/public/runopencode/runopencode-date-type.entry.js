const h = window.runopencode.h;

import './chunk-84ac4f31.js';
import { a as unserialize, b as Lightpick, c as serialize } from './chunk-096b7a75.js';

class DateType {
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
    static get style() { return ".lightpick {\n    position: absolute;\n    z-index: 99999;\n    padding: 4px;\n    border-radius: 4px;\n    background-color: #FFF;\n    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n    color: #000;\n    font-family: system-ui, Roboto, Helvetica, Arial, sans-serif;\n    line-height: 1.125em;\n}\n\n.lightpick--inlined {\n    position: static;\n}\n\n.lightpick,\n.lightpick *,\n.lightpick::after,\n.lightpick::before {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.lightpick.is-hidden {\n    display: none;\n}\n\n.lightpick__months {\n    display: grid;\n    background-color: #EEE;\n    grid-template-columns: auto;\n    grid-gap: 1px;\n}\n\n.lightpick--2-columns .lightpick__months {\n    grid-template-columns: auto auto;\n}\n\n.lightpick--3-columns .lightpick__months {\n    grid-template-columns: auto auto auto;\n}\n\n.lightpick--4-columns .lightpick__months {\n    grid-template-columns: auto auto auto auto;\n}\n\n.lightpick--5-columns .lightpick__months {\n    grid-template-columns: auto auto auto auto auto;\n}\n\n.lightpick__month {\n    padding: 4px;\n    width: 288px;\n    background-color: #FFF;\n}\n\n.lightpick__month-title-bar {\n    display: -ms-flexbox;\n    display: flex;\n    margin-bottom: 4px;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\n.lightpick__month-title {\n    margin-top: 4px;\n    margin-bottom: 4px;\n    margin-left: 4px;\n    font-size: 16px;\n    font-weight: normal;\n    line-height: 24px;\n    cursor: default;\n    padding: 0 4px;\n    border-radius: 4px;\n}\n.lightpick__month .lightpick__month-title:hover {\n    background-color: #EEE;\n}\n\n.lightpick__month-title-accent {\n    font-weight: bold;\n    pointer-events: none;\n}\n\n.lightpick__toolbar {\n    display: -ms-flexbox;\n    display: flex;\n    text-align: right;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n}\n\n.lightpick__previous-action,\n.lightpick__next-action,\n.lightpick__close-action {\n    display: -ms-flexbox;\n    display: flex;\n    margin-left: 6px;\n    width: 32px;\n    height: 32px;\n    outline: none;\n    border: none;\n    border-radius: 50%;\n    background-color: #DDD;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\n.lightpick__previous-action,\n.lightpick__next-action {\n    font-size: 12px;\n}\n\n.lightpick__close-action {\n    font-size: 18px;\n}\n\n.lightpick__previous-action:active,\n.lightpick__next-action:active,\n.lightpick__close-action:active {\n    color: inherit;\n}\n\n.lightpick__days-of-the-week {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);\n}\n\n.lightpick__day-of-the-week {\n    display: -ms-flexbox;\n    display: flex;\n    font-size: 11px;\n    font-weight: bold;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\n.lightpick__days {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);\n}\n\n.lightpick__day {\n    display: -ms-flexbox;\n    display: flex;\n    height: 40px;\n    background-position: center center;\n    background-size: contain;\n    background-repeat: no-repeat;\n    font-size: 13px;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n    cursor: default;\n}\n\n.lightpick__day.is-today {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='rgba(220, 50, 47, 0.06)' cx='16' cy='16' r='16'/%3E%3C/svg%3E\");\n    background-size: 61.8% auto;\n    color: #DC322F;\n}\n\n.lightpick__day:not(.is-disabled):hover {\n    background-size: contain;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='%23E0E0E0' cx='16' cy='16' r='16'/%3E%3C/svg%3E\");\n}\n\n.lightpick__day.is-disabled {\n    opacity: 0.38;\n    pointer-events: none;\n}\n\n.lightpick__day.disabled-tooltip {\n    pointer-events: auto;\n}\n\n.lightpick__day.is-disabled.is-forward-selected {\n    opacity: 1;\n}\n.lightpick__day.is-disabled.is-forward-selected:not(.is-start-date) {\n    background-color: rgba(38, 139, 210, 0.1);\n    background-image: none;\n}\n\n.lightpick__day.is-previous-month,\n.lightpick__day.is-next-month {\n    opacity: 0.38;\n}\n\n.lightpick__day.lightpick__day.is-in-range:not(.is-disabled) {\n    opacity: 1;\n}\n\n.lightpick__day.is-in-range {\n    border-radius: 0;\n    background-color: rgba(38, 139, 210, 0.1);\n    background-image: none;\n}\n\n.lightpick__day.is-in-range:hover {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='rgba(38, 139, 210, 0.5)' cx='16' cy='16' r='16'/%3E%3C/svg%3E\");\n}\n\n.lightpick__day.is-start-date.is-in-range,\n.lightpick__day.is-end-date.is-in-range.is-flipped {\n    border-top-left-radius: 50%;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 50%;\n    background-color: #268BD2;\n    background-image: none;\n}\n\n.lightpick__day.is-end-date.is-in-range,\n.lightpick__day.is-start-date.is-in-range.is-flipped {\n    border-top-left-radius: 0;\n    border-top-right-radius: 50%;\n    border-bottom-right-radius: 50%;\n    border-bottom-left-radius: 0;\n    background-color: #268BD2;\n    background-image: none;\n}\n\n.lightpick__day.is-start-date.is-end-date {\n    background-color: transparent;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='%23268BD2' cx='16' cy='16' r='16'/%3E%3C/svg%3E\");\n}\n\n.lightpick__day.is-start-date,\n.lightpick__day.is-end-date,\n.lightpick__day.is-start-date:hover,\n.lightpick__day.is-end-date:hover {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='%23268BD2' cx='16' cy='16' r='16'/%3E%3C/svg%3E\");\n    color: #FFF;\n    font-weight: bold;\n}\n\n.lightpick__tooltip {\n    position: absolute;\n    margin-top: -4px;\n    padding: 4px 8px;\n    border-radius: 4px;\n    background-color: #FFF;\n    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n    white-space: nowrap;\n    font-size: 11px;\n    pointer-events: none;\n}\n\n.lightpick__tooltip::before {\n    position: absolute;\n    bottom: -5px;\n    left: calc(50% - 5px);\n    border-top: 5px solid rgba(0, 0, 0, 0.12);\n    border-right: 5px solid transparent;\n    border-left: 5px solid transparent;\n    content: \"\";\n}\n\n.lightpick__tooltip::after {\n    position: absolute;\n    bottom: -4px;\n    left: calc(50% - 4px);\n    border-top: 4px solid #FFF;\n    border-right: 4px solid transparent;\n    border-left: 4px solid transparent;\n    content: \"\";\n}\n\n.lightpick__months-of-the-year {\n    padding: 4px;\n    background-color: #FFF;\n}\n.lightpick__months-of-the-year-list {\n    display: grid;\n    grid-template-columns: auto auto auto;\n    grid-gap: 8px;\n}\n.lightpick__month-of-the-year {\n    padding: 0 10px;\n    text-align: center;\n    border-radius: 3px;\n    -webkit-box-shadow: inset -1px -1px 1px 1px #E0E0E0;\n    box-shadow: inset -1px -1px 1px 1px #E0E0E0;\n    cursor: default;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n}\n.lightpick__month-of-the-year > div:first-child {\n    padding: 10px 0 2px 0;\n    font-size: .9em;\n    pointer-events: none;\n}\n.lightpick__month-of-the-year > div:last-child {\n    font-size: .7em;\n    color: #bbb;\n    padding: 2px 0 10px 0;\n    pointer-events: none;\n}\n.lightpick__month-of-the-year:hover {\n    background-color: #E0E0E0;\n    background-image: none;\n}\n.lightpick__footer {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n}\n.lightpick__reset-action,\n.lightpick__apply-action {\n    border-radius: 5px;\n    font-size: 12px;\n    border: none;\n}\n.lightpick__reset-action {\n    color: #fff;\n    background-color: #aeacad;\n}\n.lightpick__apply-action {\n    color: #fff;\n    background-color: #2495f3;\n}\nrunopencode-date-type.bootstrap4 .input-group-text {\n  cursor: pointer; }"; }
}

export { DateType as RunopencodeDateType };
