import '../../stencil.core';
export declare class ProfilePhotoEditor {
    /**
     * Start editing mode on load.
     */
    autostart: boolean;
    /**
     * Image source
     */
    src: string;
    /**
     * Toolbar configuration.
     *
     * Allowed items:
     * - crop
     * - move
     * - rotate
     * - rotate-left
     * - rotate-right
     * - flip-horizontal
     * - flip-vertical
     * - apply
     * - cancel
     * - separator
     *
     * Can be provided as array or as a string, items separated with pipe (|)
     */
    toolbar: string | Array<string>;
    /**
     * Image placeholder if there is no image.
     * If not provided, default will be used.
     */
    placeholder: string;
    /**
     * Current image data.
     */
    private _data;
    /**
     * Host element.
     */
    private _el;
    /**
     * Editable image placeholder.
     */
    private _canvas;
    /**
     * Cropper instance.
     */
    private _cropper;
    /**
     * Current editing mode.
     */
    private _mode;
    private change;
    componentDidLoad(): void;
    setValue(data: string | null): Promise<void>;
    getValue(): Promise<string | null>;
    handleSrcChange(): void;
    render(): JSX.Element[];
    /**
     * Enter edit mode.
     */
    private execCommandEdit;
    private execCommandMove;
    private execCommandCrop;
    private execCommandRotate;
    private execCommandRotateLeft;
    private execCommandRotateRight;
    private execCommandFlipHorizontal;
    private execCommandFlipVertical;
    private execCommandApply;
    private execCommandCancel;
    private startRotate;
    private doRotate;
    private stopRotate;
    /**
     * Render toolbar.
     */
    private renderToolbar;
    private isModePreview;
    private isModeEdit;
    private isModeCrop;
    private isModeMove;
    private isModeRotate;
    private isPreviewable;
}
