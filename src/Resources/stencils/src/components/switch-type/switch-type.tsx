import {
    Component,
    Element,
    EventEmitter,
    Event,
    Method,
    Prop, State,
} from '@stencil/core';

@Component({
    tag     : 'runopencode-switch-type',
    styleUrl: 'switch-type.scss',
    shadow  : true,
})
export class SwitchType {

    @Prop()
    public labelChecked: string | null = null;

    @Prop()
    public labelUnchecked: string | null = null;

    @Prop()
    public disabled: boolean = false;

    @Prop()
    public readonly: boolean = false;

    @Event()
    public change: EventEmitter;

    @Element()
    private el: HTMLElement;

    private input: HTMLInputElement;

    @State()
    private checked: boolean = false;

    public componentDidLoad(): void {
        this.input   = this.el.querySelector('input[type="checkbox"]');
        this.checked = this.input.checked;
    }

    @Method()
    public async toggle(): Promise<void> {
        this.checked       = !this.checked;
        this.input.checked = this.checked;
        this.change.emit(this.checked);
    }

    @Method()
    public async check(): Promise<void> {
        this.checked       = true;
        this.input.checked = true;
        this.change.emit(this.checked);
    }

    @Method()
    public async uncheck(): Promise<void> {
        this.checked       = false;
        this.input.checked = false;
        this.change.emit(this.checked);
    }

    @Method()
    public async setValue(value: boolean): Promise<void> {
        this.checked       = value;
        this.input.checked = value;
        this.change.emit(this.checked);
    }

    @Method()
    public async getValue(): Promise<boolean> {
        return this.checked;
    }

    public handleClick(): void {
        if (this.disabled) {
            return;
        }

        if (this.readonly) {
            return;
        }

        this.toggle();
    }

    public render() {
        return [
            <div class={this.checked ? 'switch checked' : 'switch unchecked'} onClick={this.handleClick.bind(this)}>

                {this.labelChecked ? <span class={this.checked ? 'label' : 'label hidden'}>{this.labelChecked}</span> : ''}
                {this.labelUnchecked ? <span class={!this.checked ? 'label' : 'label hidden'}>{this.labelUnchecked}</span> : ''}

                <div class={this.checked ? 'slider checked' : 'slider unchecked'}>
                </div>

                <div class="hidden" hidden>
                    <slot/>
                </div>
            </div>
        ];
    }
}
