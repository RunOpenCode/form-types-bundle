const h = window.runopencode.h;

class SwitchType {
    constructor() {
        this.labelChecked = null;
        this.labelUnchecked = null;
        this.disabled = false;
        this.readonly = false;
        this.checked = false;
    }
    componentDidLoad() {
        this.input = this.el.querySelector('input[type="checkbox"]');
        this.checked = this.input.checked;
    }
    async toggle() {
        this.checked = !this.checked;
        this.input.checked = this.checked;
        this.change.emit(this.checked);
    }
    async check() {
        this.checked = true;
        this.input.checked = true;
        this.change.emit(this.checked);
    }
    async uncheck() {
        this.checked = false;
        this.input.checked = false;
        this.change.emit(this.checked);
    }
    async setValue(value) {
        this.checked = value;
        this.input.checked = value;
        this.change.emit(this.checked);
    }
    async getValue() {
        return this.checked;
    }
    handleClick() {
        if (this.disabled) {
            return;
        }
        if (this.readonly) {
            return;
        }
        this.toggle();
    }
    render() {
        return [
            h("div", { class: this.checked ? 'switch checked' : 'switch unchecked', onClick: this.handleClick.bind(this) },
                this.labelChecked ? h("span", { class: this.checked ? 'label' : 'label hidden' }, this.labelChecked) : '',
                this.labelUnchecked ? h("span", { class: !this.checked ? 'label' : 'label hidden' }, this.labelUnchecked) : '',
                h("div", { class: this.checked ? 'slider checked' : 'slider unchecked' }),
                h("div", { class: "hidden", hidden: true },
                    h("slot", null)))
        ];
    }
    static get is() { return "runopencode-switch-type"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "check": {
            "method": true
        },
        "checked": {
            "state": true
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "getValue": {
            "method": true
        },
        "labelChecked": {
            "type": String,
            "attr": "label-checked"
        },
        "labelUnchecked": {
            "type": String,
            "attr": "label-unchecked"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "setValue": {
            "method": true
        },
        "toggle": {
            "method": true
        },
        "uncheck": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host div.switch {\n  padding: calc(var(--runopencode-switch-type-size) / 10);\n  margin: 0;\n  width: calc(var(--runopencode-switch-type-size) * 2.2);\n  height: var(--runopencode-switch-type-size);\n  background: var(--runopencode-switch-type-primary-color);\n  border-radius: calc(var(--runopencode-switch-type-size) / 2 + var(--runopencode-switch-type-size) / 10);\n  cursor: pointer;\n  -webkit-transition: background-color var(--runopencode-switch-type-animation-duration);\n  transition: background-color var(--runopencode-switch-type-animation-duration);\n  position: relative; }\n  :host div.switch.unchecked {\n    background: var(--runopencode-switch-type-unchecked-color);\n    -webkit-transition: background-color var(--runopencode-switch-type-animation-duration);\n    transition: background-color var(--runopencode-switch-type-animation-duration); }\n    :host div.switch.unchecked span.label {\n      right: 0;\n      left: auto; }\n  :host div.switch span.label {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    line-height: var(--runopencode-switch-type-size);\n    font-size: calc(var(--runopencode-switch-type-size) / 2);\n    color: #fff;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    padding: calc(var(--runopencode-switch-type-size) / 5); }\n\n:host div.slider {\n  border-radius: 100%;\n  width: var(--runopencode-switch-type-size);\n  height: var(--runopencode-switch-type-size);\n  background-color: #fff;\n  -webkit-box-shadow: 0 1px 0 2px rgba(0, 0, 0, 0.05), 0 1px 2px 2px rgba(0, 0, 0, 0.1), 0 1px 0 2px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 0 2px rgba(0, 0, 0, 0.05), 0 1px 2px 2px rgba(0, 0, 0, 0.1), 0 1px 0 2px rgba(0, 0, 0, 0.05); }\n  :host div.slider.checked {\n    -webkit-transform: translateX(calc(var(--runopencode-switch-type-size) * 2.2 - var(--runopencode-switch-type-size)));\n    transform: translateX(calc(var(--runopencode-switch-type-size) * 2.2 - var(--runopencode-switch-type-size)));\n    -webkit-transition: all var(--runopencode-switch-type-animation-duration);\n    transition: all var(--runopencode-switch-type-animation-duration); }\n  :host div.slider.unchecked {\n    -webkit-transition: all var(--runopencode-switch-type-animation-duration);\n    transition: all var(--runopencode-switch-type-animation-duration); }\n\n:host .hidden {\n  display: none !important; }\n\n:host(.secondary) div.switch {\n  background: var(--runopencode-switch-type-secondary-color); }\n  :host(.secondary) div.switch.unchecked {\n    background: var(--runopencode-switch-type-unchecked-color); }\n\n:host(.success) div.switch {\n  background: var(--runopencode-switch-type-success-color); }\n  :host(.success) div.switch.unchecked {\n    background: var(--runopencode-switch-type-unchecked-color); }\n\n:host(.danger) div.switch {\n  background: var(--runopencode-switch-type-danger-color); }\n  :host(.danger) div.switch.unchecked {\n    background: var(--runopencode-switch-type-unchecked-color); }\n\n:host(.warning) div.switch {\n  background: var(--runopencode-switch-type-warning-color); }\n  :host(.warning) div.switch.unchecked {\n    background: var(--runopencode-switch-type-unchecked-color); }\n\n:host(.info) div.switch {\n  background: var(--runopencode-switch-type-info-color); }\n  :host(.info) div.switch.unchecked {\n    background: var(--runopencode-switch-type-unchecked-color); }\n\n:host(.light) div.switch {\n  background: var(--runopencode-switch-type-light-color); }\n  :host(.light) div.switch.unchecked {\n    background: var(--runopencode-switch-type-unchecked-color); }\n\n:host(.dark) div.switch {\n  background: var(--runopencode-switch-type-dark-color); }\n  :host(.dark) div.switch.unchecked {\n    background: var(--runopencode-switch-type-unchecked-color); }"; }
}

export { SwitchType as RunopencodeSwitchType };
