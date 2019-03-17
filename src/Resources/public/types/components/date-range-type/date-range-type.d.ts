import '../../stencil.core';
import { Moment } from '../../typings/moment';
export declare class DateRangeType {
    format: string;
    numberOfMonths: number;
    buttons: boolean;
    disableWeekends: boolean;
    minDate: Moment | String | Number | Date;
    maxDate: Moment | String | Number | Date;
    minDays: number | null;
    maxDays: number | null;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    inputClass: string;
    private el;
    private picker;
    private input;
    private cssClasses;
    private cssStyle;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): JSX.Element[];
    private unserialize;
    private serialize;
}
