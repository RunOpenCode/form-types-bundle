import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class SwitchType {
    labelChecked: string | null;
    labelUnchecked: string | null;
    disabled: boolean;
    readonly: boolean;
    change: EventEmitter;
    private el;
    private input;
    private checked;
    componentDidLoad(): void;
    toggle(): Promise<void>;
    check(): Promise<void>;
    uncheck(): Promise<void>;
    setValue(value: boolean): Promise<void>;
    getValue(): Promise<boolean>;
    handleClick(): void;
    render(): JSX.Element[];
}
