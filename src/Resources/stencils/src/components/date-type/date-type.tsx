import { Component, Element, EventEmitter, Event, Method, Prop } from '@stencil/core';
import Lightpick                                          from 'lightpick';
import { Moment }                                         from '../../typings/moment';
import unserialize                                        from '../../functions/unserialize.date-time-type.function';
import serialize                                          from '../../functions/serialize.date-time-type.function';

@Component({
    tag     : 'runopencode-date-type',
    styleUrl: 'date-type.scss',
    shadow  : false,
})
export class DateType {

    @Prop()
    public dateFormat: string = 'DD/MM/YYYY';

    @Prop()
    public theme: string = 'bootstrap4';

    @Prop()
    public disableWeekends: boolean = false;

    @Prop()
    public minDate: Moment | String | Number | Date = null;

    @Prop()
    public maxDate: Moment | String | Number | Date = null;

    @Prop()
    public placeholder: string = null;

    @Prop()
    public disabled: boolean = false;

    @Prop()
    public readonly: boolean = false;

    @Prop()
    public required: boolean = false;

    @Event()
    public change: EventEmitter;

    @Element()
    private el: HTMLElement;

    private picker: Lightpick;

    private input: HTMLElement;

    private readonly themes: { [name: string]: Function } = {
        'bootstrap4': this.renderBoostrap4Theme,
    };

    public hostData() {

        return {
            'class': {
                [this.theme]: true,
            },
        };
    }

    public componentDidLoad(): void {
        this.input            = this.el.querySelector('input[type="text"]');
        let date: Date | null = unserialize(this.el);

        this.picker = new Lightpick({
            field          : this.input,
            format         : this.dateFormat,
            singleDate     : true,
            minDate        : this.minDate,
            maxDate        : this.maxDate,
            numberOfMonths : 1,
            numberOfColumns: 1,
            hoveringTooltip: false,
            disableWeekends: this.disableWeekends,
            onSelect       : (date: Moment) => {
                serialize(this.el, date ? date.toDate() : null);
                this.change.emit(date);
            },
        });

        if (date) {
            this.picker.setDateRange(date);
        }
    }

    public componentDidUnload(): void {
        this.picker.destroy();
    }

    public render() {

        if (this.themes[this.theme]) {
            return this.themes[this.theme].apply(this, []);
        }

        throw new Error(`Theme "${this.theme}" is not supported.`);
    }

    @Method()
    public async getValue(): Promise<Date | null> {
        return this.picker.getDate();
    }

    @Method()
    public async setValue(date: Date | null): Promise<void> {
        this.picker.setDate(date);
        serialize(this.el, date);
        this.change.emit(date);
    }

    private show(event: UIEvent): void {
        this.picker.show();
        event.stopPropagation();
    }

    private clear(event: UIEvent): void {
        this.setValue(null);
        event.stopPropagation();
    }

    private renderBoostrap4Theme() {

        return [

            <div>

                <div class="input-group">
                    <input
                        type="text"
                        readonly={this.readonly}
                        disabled={this.disabled}
                        required={this.required}
                        placeholder={this.placeholder}
                        class="form-control"
                    />

                    <div class="input-group-append">
                        <span class="input-group-text" onClick={(event: UIEvent) => this.show.bind(this)(event)}>
                            <i class="far fa-calendar-alt"></i>
                        </span>

                        {this.required
                            ?
                            ''
                            :
                            <span class="input-group-text" onClick={(event: UIEvent) => this.clear.bind(this)(event)}>
                                <i class="fas fa-times"></i>
                            </span>
                        }
                    </div>
                </div>

                <div class="hidden" hidden>
                    <slot/>
                </div>

            </div>,
        ]
    }
}
