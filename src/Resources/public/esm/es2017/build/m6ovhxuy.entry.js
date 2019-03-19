import { h } from '../runopencode.core.js';

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
    static get style() { return ":host div.switch{padding:calc(var(--runopencode-switch-type-size) / 10);margin:0;width:calc(var(--runopencode-switch-type-size) * 2.2);height:var(--runopencode-switch-type-size);background:var(--runopencode-switch-type-primary-color);border-radius:calc(var(--runopencode-switch-type-size) / 2 + var(--runopencode-switch-type-size) / 10);cursor:pointer;position:relative}:host div.switch,:host div.switch.unchecked{-webkit-transition:background-color var(--runopencode-switch-type-animation-duration);transition:background-color var(--runopencode-switch-type-animation-duration)}:host div.switch.unchecked{background:var(--runopencode-switch-type-unchecked-color)}:host div.switch.unchecked span.label{right:0;left:auto}:host div.switch span.label{position:absolute;top:0;bottom:0;left:0;line-height:var(--runopencode-switch-type-size);font-size:calc(var(--runopencode-switch-type-size) / 2);color:#fff;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:calc(var(--runopencode-switch-type-size) / 5)}:host div.slider{border-radius:100%;width:var(--runopencode-switch-type-size);height:var(--runopencode-switch-type-size);background-color:#fff;-webkit-box-shadow:0 1px 0 2px rgba(0,0,0,.05),0 1px 2px 2px rgba(0,0,0,.1),0 1px 0 2px rgba(0,0,0,.05);box-shadow:0 1px 0 2px rgba(0,0,0,.05),0 1px 2px 2px rgba(0,0,0,.1),0 1px 0 2px rgba(0,0,0,.05)}:host div.slider.checked{-webkit-transform:translateX(calc(var(--runopencode-switch-type-size) * 2.2 - var(--runopencode-switch-type-size)));transform:translateX(calc(var(--runopencode-switch-type-size) * 2.2 - var(--runopencode-switch-type-size)))}:host div.slider.checked,:host div.slider.unchecked{-webkit-transition:all var(--runopencode-switch-type-animation-duration);transition:all var(--runopencode-switch-type-animation-duration)}:host .hidden{display:none!important}:host(.secondary) div.switch{background:var(--runopencode-switch-type-secondary-color)}:host(.secondary) div.switch.unchecked{background:var(--runopencode-switch-type-unchecked-color)}:host(.success) div.switch{background:var(--runopencode-switch-type-success-color)}:host(.success) div.switch.unchecked{background:var(--runopencode-switch-type-unchecked-color)}:host(.danger) div.switch{background:var(--runopencode-switch-type-danger-color)}:host(.danger) div.switch.unchecked{background:var(--runopencode-switch-type-unchecked-color)}:host(.warning) div.switch{background:var(--runopencode-switch-type-warning-color)}:host(.warning) div.switch.unchecked{background:var(--runopencode-switch-type-unchecked-color)}:host(.info) div.switch{background:var(--runopencode-switch-type-info-color)}:host(.info) div.switch.unchecked{background:var(--runopencode-switch-type-unchecked-color)}:host(.light) div.switch{background:var(--runopencode-switch-type-light-color)}:host(.light) div.switch.unchecked{background:var(--runopencode-switch-type-unchecked-color)}:host(.dark) div.switch{background:var(--runopencode-switch-type-dark-color)}:host(.dark) div.switch.unchecked{background:var(--runopencode-switch-type-unchecked-color)}"; }
}

export { SwitchType as RunopencodeSwitchType };
