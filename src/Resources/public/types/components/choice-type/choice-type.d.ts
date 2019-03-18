import { EventEmitter } from '../../stencil.core';
export declare class ChoiceType {
    display: number | null;
    placeholder: string | null;
    searchPlaceholder: string | null;
    change: EventEmitter;
    private el;
    private select;
    private choices;
    componentDidLoad(): void;
    componentDidUnload(): void;
    getValue(): Promise<string | string[]>;
    setValue(value: string | string[]): Promise<void>;
}
