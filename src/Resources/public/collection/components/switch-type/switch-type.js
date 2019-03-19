export class SwitchType {
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
    static get style() { return "/**style-placeholder:runopencode-switch-type:**/"; }
}
