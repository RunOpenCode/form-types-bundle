import { Component, Element, Prop } from '@stencil/core';
import Lightpick                    from 'lightpick';
import { Moment }                   from '../../typings/moment';

@Component({
    tag     : 'runopencode-date-range-type',
    styleUrl: 'date-range-type.scss',
    shadow  : false,
})
export class DateRangeType {

    @Prop()
    public format: string = 'DD/MM/YYYY';

    @Prop()
    public numberOfMonths: number = 2;

    @Prop()
    public buttons: boolean = false;

    @Prop()
    public disableWeekends: boolean = false;

    @Prop()
    public minDate: Moment | String | Number | Date = null;

    @Prop()
    public maxDate: Moment | String | Number | Date = null;

    @Prop()
    public minDays: number | null = null;

    @Prop()
    public maxDays: number | null = null;

    @Prop()
    public disabled: boolean = false;

    @Prop()
    public readonly: boolean = false;

    @Prop()
    public required: boolean = false

    @Prop()
    public inputClass: string = '';

    @Element()
    private el: HTMLElement;

    private picker: Lightpick;

    private input: HTMLElement;

    private cssClasses: string | null;

    private cssStyle: string | null;

    public componentWillLoad(): void {
        this.cssClasses = this.el.getAttribute('class');
        this.cssStyle   = this.el.getAttribute('style');
    }

    public componentDidLoad(): void {
        this.input    = this.el.querySelector('input[type="text"]');
        let from      = this.unserialize('from');
        let to        = this.unserialize('to');
        let serialize = this.serialize.bind(this);

        this.picker = new Lightpick({
            field          : this.input,
            singleDate     : false,
            minDate        : this.minDate,
            maxDate        : this.maxDate,
            minDays        : this.minDays,
            maxDays        : this.maxDays,
            footer         : this.buttons,
            format         : this.format,
            numberOfMonths : this.numberOfMonths,
            numberOfColumns: this.numberOfMonths,
            hoveringTooltip: false,
            disableWeekends: this.disableWeekends,
            onSelect       : (start: Moment, end: Moment) => {
                serialize('from', start ? start.toDate() : null);
                serialize('to', end ? end.toDate() : null);
            },
        });

        if (from || to) {
            this.picker.setDateRange(from, to);
        }

        if (this.cssClasses) {

            this.cssClasses.split(' ').forEach((cssClass: string) => {
                this.el.classList.remove(cssClass);
                this.input.classList.add(cssClass);
            });
        }

        if (this.cssStyle) {
            this.input.setAttribute('style', this.cssStyle);
            this.el.setAttribute('style', this.cssStyle);
        }
    }

    public componentDidUnload(): void {

        if (this.cssClasses) {
            this.el.className = this.cssClasses;
        }

        if (this.cssStyle) {
            this.el.setAttribute('style', this.cssStyle);
        }

        this.picker.destroy();
    }

    public render() {
        return [
            <div>
                <input type="text" class={this.inputClass} readonly={this.readonly} disabled={this.disabled}
                       required={this.required}/>

                {!this.required
                    ? <span>Close</span>
                    : ''
                }

                <div class="hidden" hidden>
                    <slot/>
                </div>
            </div>,
        ]
    }

    private unserialize(field: string): Date | null {
        let dayElement: HTMLSelectElement   = (this.el.querySelector(`[name$="[${field}][day]"]`) as HTMLSelectElement);
        let monthElement: HTMLSelectElement = (this.el.querySelector(`[name$="[${field}][month]"]`) as HTMLSelectElement);
        let yearElement: HTMLSelectElement  = (this.el.querySelector(`[name$="[${field}][year]"]`) as HTMLSelectElement);
        let day: string                     = dayElement.selectedIndex !== -1 ? (dayElement[dayElement.selectedIndex] as HTMLOptionElement).value : null;
        let month: string                   = monthElement.selectedIndex !== -1 ? (monthElement[monthElement.selectedIndex] as HTMLOptionElement).value : null;
        let year: string                    = yearElement.selectedIndex !== -1 ? (yearElement[yearElement.selectedIndex] as HTMLOptionElement).value : null;

        if (!day) {
            return null;
        }

        if (!month) {
            return null;
        }

        if (!year) {
            return null;
        }

        return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    }

    private serialize(field: string, value: Date | null): void {
        let dayElement: HTMLSelectElement   = (this.el.querySelector(`[name$="[${field}][day]"]`) as HTMLSelectElement);
        let monthElement: HTMLSelectElement = (this.el.querySelector(`[name$="[${field}][month]"]`) as HTMLSelectElement);
        let yearElement: HTMLSelectElement  = (this.el.querySelector(`[name$="[${field}][year]"]`) as HTMLSelectElement);

        dayElement.selectedIndex   = -1;
        monthElement.selectedIndex = -1;
        yearElement.selectedIndex  = -1;

        if (!value) {
            return;
        }

        (dayElement.querySelector(`option[value="${value.getDate()}"]`) as HTMLOptionElement).selected          = true;
        (monthElement.querySelector(`option[value="${value.getMonth() + 1}"]`) as HTMLOptionElement).selected   = true;
        (yearElement.querySelector(`option[value="${value.getFullYear() + 1}"]`) as HTMLOptionElement).selected = true;
    }
}
