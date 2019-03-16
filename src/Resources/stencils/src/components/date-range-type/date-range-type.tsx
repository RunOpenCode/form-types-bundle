import { Component, Element, Prop } from '@stencil/core';
import Lightpick                    from 'lightpick';
import { Moment }                   from '../../typings/moment';

@Component({
    tag     : 'runopencode-date-range-type',
    styleUrl: 'date-range-type.scss',
    shadow  : false,
})
export class DateRangeType {

    @Prop({ mutable: false })
    public numberOfMonths: number = 2;

    @Prop({ mutable: false })
    public numberOfColumns: number = 2;

    @Prop({ mutable: false })
    public minDate: Moment | String | Number | Date = null;

    @Prop({ mutable: false })
    public maxDate: Moment | String | Number | Date = null;

    @Prop()
    public minDays: number | null = null;

    @Prop()
    public maxDays: number | null = null;

    @Prop()
    public footer: boolean = true;

    @Prop()
    public format: string = 'DD/MM/YYYY';

    @Element()
    private el: HTMLElement;

    private picker: Lightpick;

    public componentDidLoad(): void {
        let input     = this.el.querySelector('input[type="text"]');
        let from      = this.unserialize('from');
        let to        = this.unserialize('to');
        let serialize = this.serialize.bind(this);

        this.picker = new Lightpick({
            field          : input,
            singleDate     : false,
            minDate        : this.minDate,
            maxDate        : this.maxDate,
            minDays        : this.minDays,
            maxDays        : this.maxDays,
            footer         : this.footer,
            format         : this.format,
            numberOfMonths : this.numberOfMonths,
            numberOfColumns: this.numberOfColumns,
            onSelect       : (start: Moment, end: Moment) => {
                serialize('from', start ? start.toDate() : null);
                serialize('to', end ? end.toDate() : null);
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
        return [
            <div>
                <input type="text"/>
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
