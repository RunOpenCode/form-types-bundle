import '../../stencil.core';
import { Moment } from '../../typings/moment';
export declare class DateRangeType {
    numberOfMonths: number;
    numberOfColumns: number;
    minDate: Moment | String | Number | Date;
    maxDate: Moment | String | Number | Date;
    minDays: number | null;
    maxDays: number | null;
    footer: boolean;
    format: string;
    private el;
    private picker;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): JSX.Element[];
    private unserialize;
    private serialize;
}
