import {
    Component,
    Element,
    Prop,
    Method,
    Event,
    EventEmitter,
}              from '@stencil/core';
import Choices from 'choices.js';

@Component({
    tag     : 'runopencode-choice-type',
    styleUrl: 'choice-type.scss',
    shadow  : false,
})
export class ChoiceType {

    @Prop()
    public display: number | null;

    @Prop()
    public placeholder: string | null;

    @Prop()
    public searchPlaceholder: string | null;

    @Event()
    public change: EventEmitter;

    @Element()
    private el: HTMLElement;

    private select: HTMLSelectElement;

    private choices: Choices;

    public componentDidLoad(): void {
        this.select  = this.el.querySelector('select');
        this.choices = new Choices(this.select, {
            renderChoiceLimit     : this.display ? this.display : -1,
            searchResultLimit     : this.display ? this.display : 10,
            removeItemButton      : true,
            placeholder           : !!this.placeholder,
            placeholderValue      : this.placeholder,
            searchPlaceholderValue: this.searchPlaceholder,
            itemSelectText        : '',
        });

        this.select.addEventListener('change', (event: UIEvent) => {
            event.stopPropagation();
            this.change.emit(this.choices.getValue(true));
        });
    }

    public componentDidUnload(): void {
        this.choices.destroy();
    }

    @Method()
    public async getValue(): Promise<string | string[]> {
        return this.choices.getValue(true);
    }

    @Method()
    public async setValue(value: string | string[]): Promise<void> {
        this.choices.isSelectOneElement ? this.choices.setValue([value as string]) : this.choices.setValue(value as string[]);
        this.change.emit(this.choices.getValue(true));
    }
}
