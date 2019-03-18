import { EventEmitter } from '../../stencil.core';
import { Moment } from '../../typings/moment';
export declare class DateRangeType {
    dateFormat: string;
    theme: string;
    disableWeekends: boolean;
    minDate: Moment | String | Number | Date;
    maxDate: Moment | String | Number | Date;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    numberOfMonths: number;
    minDays: number | null;
    maxDays: number | null;
    change: EventEmitter;
    private el;
    private picker;
    private input;
    private readonly themes;
    hostData(): {
        'class': {
            [x: string]: boolean;
        };
    };
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): any;
    getValue(): Promise<[Date | null, Date | null]>;
    getDateFrom(): Promise<Date | null>;
    getDateTo(): Promise<Date | null>;
    setValue(from: Date | null, to: Date | null): Promise<void>;
    setDateFrom(from: Date | null): Promise<void>;
    setDateTo(to: Date | null): Promise<void>;
    private show;
    private clear;
    private renderBoostrap4Theme;
}
