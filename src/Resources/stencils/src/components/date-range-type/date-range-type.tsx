import {
    Component,
    Element,
    Event,
    EventEmitter,
    Method,
    Prop,
}                  from '@stencil/core';
import Lightpick   from 'lightpick';
import { Moment }  from '../../typings/moment';
import unserialize from '../../functions/unserialize.date-time-type.function';
import serialize   from '../../functions/serialize.date-time-type.function';

@Component({
    tag     : 'runopencode-date-range-type',
    styleUrl: 'date-range-type.scss',
    shadow  : false,
})
export class DateRangeType {

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

    @Prop()
    public numberOfMonths: number = 2;

    @Prop()
    public minDays: number | null = null;

    @Prop()
    public maxDays: number | null = null;

    @Event()
    private change: EventEmitter;

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
        let from: Date | null = unserialize(this.el, 'from');
        let to: Date | null   = unserialize(this.el, 'to');

        this.picker = new Lightpick({
            field          : this.input,
            singleDate     : false,
            minDate        : this.minDate,
            maxDate        : this.maxDate,
            minDays        : this.minDays,
            maxDays        : this.maxDays,
            format         : this.dateFormat,
            numberOfMonths : this.numberOfMonths,
            numberOfColumns: this.numberOfMonths,
            hoveringTooltip: false,
            disableWeekends: this.disableWeekends,
            onSelect       : (start: Moment, end: Moment) => {
                from = start ? start.toDate() : null;
                to   = end ? end.toDate() : null;
                serialize(this.el, from, 'from');
                serialize(this.el, to, 'to');
                this.change.emit([from, to]);
            },
        });

        if (from || to) {
            this.picker.setDateRange(from, to);
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
    public async getValue(): Promise<[Date | null, Date | null]> {
        return [
            this.picker.getStartDate(),
            this.picker.getEndDate(),
        ]
    }

    @Method()
    public async getDateFrom(): Promise<Date | null> {
        return this.picker.getStartDate();
    }

    @Method()
    public async getDateTo(): Promise<Date | null> {
        return this.picker.getEndDate();
    }

    @Method()
    public async setValue(from: Date | null, to: Date | null): Promise<void> {
        this.picker.setDateRange(from, to);
        serialize(this.el, from, 'from');
        serialize(this.el, to, 'to');
        this.change.emit([from, to]);
    }

    @Method()
    public async setDateFrom(from: Date | null): Promise<void> {
        let to: Date | null = this.picker.getEndDate() ? this.picker.getEndDate().toDate() : null;
        this.setValue(from, to);
    }

    @Method()
    public async setDateTo(to: Date | null): Promise<void> {
        let from: Date | null = this.picker.getStartDate() ? this.picker.getStartDate().toDate() : null;
        this.setValue(from, to);
    }

    private show(event: UIEvent): void {
        this.picker.show();
        event.stopPropagation();
    }

    private clear(event: UIEvent): void {
        this.setValue(null, null);
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
