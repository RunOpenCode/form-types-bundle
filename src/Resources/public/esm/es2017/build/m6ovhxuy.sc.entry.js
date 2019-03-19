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
    static get style() { return ".sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{padding:calc(var(--runopencode-switch-type-size) / 10);margin:0;width:calc(var(--runopencode-switch-type-size) * 2.2);height:var(--runopencode-switch-type-size);background:var(--runopencode-switch-type-primary-color);border-radius:calc(var(--runopencode-switch-type-size) / 2 + var(--runopencode-switch-type-size) / 10);cursor:pointer;position:relative}.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type, .sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{-webkit-transition:background-color var(--runopencode-switch-type-animation-duration);transition:background-color var(--runopencode-switch-type-animation-duration)}.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type   span.label.sc-runopencode-switch-type{right:0;left:auto}.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type   span.label.sc-runopencode-switch-type{position:absolute;top:0;bottom:0;left:0;line-height:var(--runopencode-switch-type-size);font-size:calc(var(--runopencode-switch-type-size) / 2);color:#fff;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:calc(var(--runopencode-switch-type-size) / 5)}.sc-runopencode-switch-type-h   div.slider.sc-runopencode-switch-type{border-radius:100%;width:var(--runopencode-switch-type-size);height:var(--runopencode-switch-type-size);background-color:#fff;-webkit-box-shadow:0 1px 0 2px rgba(0,0,0,.05),0 1px 2px 2px rgba(0,0,0,.1),0 1px 0 2px rgba(0,0,0,.05);box-shadow:0 1px 0 2px rgba(0,0,0,.05),0 1px 2px 2px rgba(0,0,0,.1),0 1px 0 2px rgba(0,0,0,.05)}.sc-runopencode-switch-type-h   div.slider.checked.sc-runopencode-switch-type{-webkit-transform:translateX(calc(var(--runopencode-switch-type-size) * 2.2 - var(--runopencode-switch-type-size)));transform:translateX(calc(var(--runopencode-switch-type-size) * 2.2 - var(--runopencode-switch-type-size)))}.sc-runopencode-switch-type-h   div.slider.checked.sc-runopencode-switch-type, .sc-runopencode-switch-type-h   div.slider.unchecked.sc-runopencode-switch-type{-webkit-transition:all var(--runopencode-switch-type-animation-duration);transition:all var(--runopencode-switch-type-animation-duration)}.sc-runopencode-switch-type-h   .hidden.sc-runopencode-switch-type{display:none!important}.secondary.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-secondary-color)}.secondary.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.success.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-success-color)}.success.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.danger.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-danger-color)}.danger.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.warning.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-warning-color)}.warning.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.info.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-info-color)}.info.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.light.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-light-color)}.light.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.dark.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-dark-color)}.dark.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}"; }
}

export { SwitchType as RunopencodeSwitchType };
