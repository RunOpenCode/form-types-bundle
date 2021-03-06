import { Moment } from '../../typings/moment';
export declare class DateType {
    dateFormat: string;
    theme: string;
    disableWeekends: boolean;
    minDate: Moment | String | Number | Date;
    maxDate: Moment | String | Number | Date;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    private change;
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
    getValue(): Promise<Date | null>;
    setValue(date: Date | null): Promise<void>;
    private show;
    private clear;
    private renderBoostrap4Theme;
}
