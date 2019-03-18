import Choices from 'choices.js';
export class ChoiceType {
    componentDidLoad() {
        this.select = this.el.querySelector('select');
        this.choices = new Choices(this.select, {
            renderChoiceLimit: this.display ? this.display : -1,
            searchResultLimit: this.display ? this.display : 10,
            removeItemButton: true,
            placeholder: !!this.placeholder,
            placeholderValue: this.placeholder,
            searchPlaceholderValue: this.searchPlaceholder,
            itemSelectText: '',
        });
        this.el.addEventListener('change', (event) => {
            event.stopPropagation();
            this.change.emit(this.choices.getValue(true));
        });
    }
    componentDidUnload() {
        this.choices.destroy();
    }
    async getValue() {
        return this.choices.getValue(true);
    }
    async setValue(value) {
        this.choices.isSelectOneElement ? this.choices.setValue([value]) : this.choices.setValue(value);
        this.change.emit(this.choices.getValue(true));
    }
    static get is() { return "runopencode-choice-type"; }
    static get properties() { return {
        "display": {
            "type": Number,
            "attr": "display"
        },
        "el": {
            "elementRef": true
        },
        "getValue": {
            "method": true
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "searchPlaceholder": {
            "type": String,
            "attr": "search-placeholder"
        },
        "setValue": {
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
    static get style() { return "/**style-placeholder:runopencode-choice-type:**/"; }
}
