import {Component, Element, Event, EventEmitter, Method, Prop, State, Watch} from "@stencil/core";
import Cropper                                                               from 'cropperjs';
import {EditingMode}                                                         from "./editing-mode";

import {
    apply as iconApply,
    cancel as iconCancel,
    crop as iconCrop,
    edit as iconEdit,
    flipHorizontal as iconFlipHorizontal,
    flipVertical as iconFlipVertical,
    image as iconImage,
    move as iconMove,
    rotate as iconRotate,
    rotateLeft as iconRotateLeft,
    rotateRight as iconRotateRight,
} from './icons';

const RDR: number = 180 / Math.PI;

@Component({
    tag:      'runopencode-profile-photo-editor',
    styleUrl: 'profile-photo-editor.scss',
    shadow:   true,
})
export class ProfilePhotoEditor {

    /**
     * Start editing mode on load.
     */
    @Prop()
    public autostart: boolean = false;

    /**
     * Image source
     */
    @Prop({mutable: true})
    public src: string = null;

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
    @Prop()
    public toolbar: string | Array<string> = 'crop|move|separator|rotate|rotate-left|rotate-right|separator|flip-horizontal|flip-vertical|separator|apply|cancel';

    /**
     * Image placeholder if there is no image.
     * If not provided, default will be used.
     */
    @Prop()
    public placeholder: string = null;

    /**
     * Current image data.
     */
    @State()
    private _data: string = null;

    /**
     * Host element.
     */
    @Element()
    private _el: HTMLElement;

    /**
     * Editable image placeholder.
     */
    private _canvas: HTMLImageElement;

    /**
     * Cropper instance.
     */
    private _cropper: Cropper = null;

    /**
     * Current editing mode.
     */
    @State()
    private _mode: EditingMode = EditingMode.PREVIEW;

    @Event()
    private change: EventEmitter;

    public componentDidLoad(): void {
        this._canvas = this._el.shadowRoot.querySelector('#canvas');

        if (this.src) {
            this.setValue(this.src);
        }

        if (this.autostart) {
            this.execCommandEdit();
        }
    }

    @Method()
    public async setValue(data: string | null): Promise<void> {
        this._data       = data;
        this._canvas.src = data;

        this.change.emit(this._data);
    }

    @Method()
    public async getValue(): Promise<string | null> {
        return this._data;
    }

    @Watch('src')
    handleSrcChange(): void {
        this.setValue(this.src);
    }

    public render(): JSX.Element[] {

        return [
            <div id="editor" class={this._mode}>
                <img id="canvas" class={this.isModeEdit() || this.isPreviewable() ? '' : 'hidden'}/>
                <div id="placeholder" class={this.isModePreview() && !this.isPreviewable() ? '' : 'hidden'}>
                    {this.placeholder ? <img src={this.placeholder}/> : iconImage}
                </div>
                <div
                    id="rotate-helper"
                    class={this.isModeRotate() ? '' : 'hidden'}
                    onMouseDown={() => {
                        this.startRotate();
                    }}
                    onMouseMove={(event: UIEvent) => {
                        this.doRotate(event);
                    }}
                    onMouseUp={() => {
                        this.stopRotate();
                    }}
                >
                </div>
                <span
                    id="action-edit"
                    class={this.isModePreview() ? '' : 'hidden'}
                    onClick={() => this.execCommandEdit()}
                >
                    {iconEdit}
                </span>
                <div id="toolbar" class={this.isModeEdit() ? '' : 'hidden'} onClick={(event: UIEvent) => {
                    event.stopPropagation();
                }}>
                    <div id="dock">
                        {this.renderToolbar()}
                    </div>
                </div>
            </div>
        ];
    }

    /**
     * Enter edit mode.
     */
    private execCommandEdit(): void {
        this._cropper = new Cropper(this._canvas, {
            autoCrop:                 false,
            dragMode:                 'none' as Cropper.DragMode.None,
            cropBoxMovable:           true,
            zoomable:                 true,
            minContainerWidth:        300,
            minContainerHeight:       200,
            toggleDragModeOnDblclick: false,
            ready:                    () => {
                (this._cropper as any).options.zoomable = false;
            }
        });

        this._mode = EditingMode.NONE;
    }

    private execCommandMove(): void {
        this._mode                              = EditingMode.MOVE;
        (this._cropper as any).options.zoomable = true;

        this._cropper.setDragMode('move' as Cropper.DragMode.Move);
    }

    private execCommandCrop(): void {
        this._mode                              = EditingMode.CROP;
        (this._cropper as any).options.zoomable = false;

        this._cropper.setDragMode('crop' as Cropper.DragMode.Crop);
    }

    private execCommandRotate(): void {
        this._mode                              = EditingMode.ROTATE;
        (this._cropper as any).options.zoomable = false;

        this._cropper.setDragMode('none' as Cropper.DragMode.None);
    }

    private execCommandRotateLeft(): void {
        this._cropper.rotate(-45);
    }

    private execCommandRotateRight(): void {
        this._cropper.rotate(45);
    }

    private execCommandFlipHorizontal(): void {
        (this._cropper as any).currentScaleX = -((this._cropper as any).currentScaleX || 1);
        this._cropper.scaleX((this._cropper as any).currentScaleX);
    }

    private execCommandFlipVertical(): void {
        (this._cropper as any).currentScaleY = -((this._cropper as any).currentScaleY || 1);
        this._cropper.scaleY((this._cropper as any).currentScaleY);
    }

    private execCommandApply(): void {
        this._data       = this._cropper.getCroppedCanvas().toDataURL();
        this._canvas.src = this._data;
        this._mode       = EditingMode.PREVIEW;

        this._cropper.destroy();
        this._cropper = null;

        this.change.emit(this._data);
    }

    private execCommandCancel(): void {
        this._mode = EditingMode.PREVIEW;

        this._cropper.destroy();
        this._cropper = null;
    }

    private startRotate(): void {
        let cropperCanvas              = this._el.shadowRoot.querySelector('.cropper-canvas');
        (cropperCanvas as any)._rotate = true;
    }

    private doRotate(event: UIEvent): void {
        let cropperCanvas = this._el.shadowRoot.querySelector('.cropper-canvas');

        if (!(cropperCanvas as any)._rotate) {
            return;
        }

        let rectangle                      = cropperCanvas.getBoundingClientRect();
        let centerX                        = rectangle.left + (rectangle.width / 2);
        let centerY                        = rectangle.top + (rectangle.height / 2);
        let x                              = (event as MouseEvent).clientX - centerX;
        let y                              = (event as MouseEvent).clientY - centerY;
        let angle                          = RDR * Math.atan2(y, x);
        let rotation                       = angle - (cropperCanvas as any)._startAngle;
        (cropperCanvas as any)._startAngle = angle;
        this._cropper.rotate(rotation);
    }

    private stopRotate(): void {
        let cropperCanvas              = this._el.shadowRoot.querySelector('.cropper-canvas');
        (cropperCanvas as any)._rotate = false;
    }

    /**
     * Render toolbar.
     */
    private renderToolbar(): JSX.Element[] {
        let toolbar: string[] = this.toolbar as string[];

        if (!(this.toolbar instanceof Array)) {
            toolbar = this.toolbar.split('|');
        }

        let tools: string[] = toolbar;
        let elements        = [];

        tools.forEach((tool: string) => {
            if (!tool.trim()) {
                return;
            }

            switch (tool) {
                case 'separator':
                    elements.push(<span class="separator"></span>);
                    break;
                case 'move':
                    elements.push(
                        <span class={this.isModeMove() ? 'active' : ''} onClick={() => this.execCommandMove()}>
                            {iconMove}
                        </span>
                    );
                    break;
                case 'crop':
                    elements.push(
                        <span class={this.isModeCrop() ? 'active' : ''} onClick={() => this.execCommandCrop()}>
                            {iconCrop}
                        </span>
                    );
                    break;
                case 'rotate':
                    elements.push(
                        <span class={this.isModeRotate() ? 'active' : ''} onClick={() => this.execCommandRotate()}>
                            {iconRotate}
                        </span>
                    );
                    break;
                case 'rotate-left':
                    elements.push(
                        <span onClick={() => this.execCommandRotateLeft()}>
                            {iconRotateLeft}
                        </span>
                    );
                    break;
                case 'rotate-right':
                    elements.push(
                        <span onClick={() => this.execCommandRotateRight()}>
                            {iconRotateRight}
                        </span>
                    );
                    break;
                case 'flip-horizontal':
                    elements.push(
                        <span onClick={() => this.execCommandFlipHorizontal()}>
                            {iconFlipHorizontal}
                        </span>
                    );
                    break;
                case 'flip-vertical':
                    elements.push(
                        <span onClick={() => this.execCommandFlipVertical()}>
                            {iconFlipVertical}
                        </span>
                    );
                    break;
                case 'apply':
                    elements.push(
                        <span onClick={() => this.execCommandApply()}>
                            {iconApply}
                        </span>
                    );
                    break;
                case 'cancel':
                    elements.push(
                        <span onClick={() => this.execCommandCancel()}>
                            {iconCancel}
                        </span>
                    );
                    break;
                default:
                    throw new Error(`Unknown tool "${tool}" requested.`);
            }
        });

        return elements;
    }

    private isModePreview(): boolean {
        return EditingMode.PREVIEW === this._mode
    }

    private isModeEdit(): boolean {
        return !this.isModePreview();
    }

    private isModeCrop(): boolean {
        return EditingMode.CROP === this._mode
    }

    private isModeMove(): boolean {
        return EditingMode.MOVE === this._mode
    }

    private isModeRotate(): boolean {
        return EditingMode.ROTATE === this._mode
    }

    private isPreviewable(): boolean {
        return !!this._data;
    }
}

