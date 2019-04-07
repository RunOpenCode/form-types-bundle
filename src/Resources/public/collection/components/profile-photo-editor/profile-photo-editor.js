import Cropper from 'cropperjs';
import { EditingMode } from "./editing-mode";
import { apply as iconApply, cancel as iconCancel, crop as iconCrop, edit as iconEdit, flipHorizontal as iconFlipHorizontal, flipVertical as iconFlipVertical, image as iconImage, move as iconMove, rotate as iconRotate, rotateLeft as iconRotateLeft, rotateRight as iconRotateRight, } from './icons';
const RDR = 180 / Math.PI;
export class ProfilePhotoEditor {
    constructor() {
        /**
         * Start editing mode on load.
         */
        this.autostart = false;
        /**
         * Image source
         */
        this.src = null;
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
        this.toolbar = 'crop|move|separator|rotate|rotate-left|rotate-right|separator|flip-horizontal|flip-vertical|separator|apply|cancel';
        /**
         * Image placeholder if there is no image.
         * If not provided, default will be used.
         */
        this.placeholder = null;
        /**
         * Current image data.
         */
        this._data = null;
        /**
         * Cropper instance.
         */
        this._cropper = null;
        /**
         * Current editing mode.
         */
        this._mode = EditingMode.PREVIEW;
    }
    componentDidLoad() {
        this._canvas = this._el.shadowRoot.querySelector('#canvas');
        if (this.src) {
            this.setValue(this.src);
        }
        if (this.autostart) {
            this.execCommandEdit();
        }
    }
    async setValue(data) {
        this._data = data;
        this._canvas.src = data;
        this.change.emit(this._data);
    }
    async getValue() {
        return this._data;
    }
    handleSrcChange() {
        this.setValue(this.src);
    }
    render() {
        return [
            h("div", { id: "editor", class: this._mode },
                h("img", { id: "canvas", class: this.isModeEdit() || this.isPreviewable() ? '' : 'hidden' }),
                h("div", { id: "placeholder", class: this.isModePreview() && !this.isPreviewable() ? '' : 'hidden' }, this.placeholder ? h("img", { src: this.placeholder }) : iconImage),
                h("div", { id: "rotate-helper", class: this.isModeRotate() ? '' : 'hidden', onMouseDown: () => {
                        this.startRotate();
                    }, onMouseMove: (event) => {
                        this.doRotate(event);
                    }, onMouseUp: () => {
                        this.stopRotate();
                    } }),
                h("span", { id: "action-edit", class: this.isModePreview() ? '' : 'hidden', onClick: () => this.execCommandEdit() }, iconEdit),
                h("div", { id: "toolbar", class: this.isModeEdit() ? '' : 'hidden', onClick: (event) => {
                        event.stopPropagation();
                    } },
                    h("div", { id: "dock" }, this.renderToolbar())))
        ];
    }
    /**
     * Enter edit mode.
     */
    execCommandEdit() {
        this._cropper = new Cropper(this._canvas, {
            autoCrop: false,
            dragMode: 'none',
            cropBoxMovable: true,
            zoomable: true,
            minContainerWidth: 300,
            minContainerHeight: 200,
            toggleDragModeOnDblclick: false,
            ready: () => {
                this._cropper.options.zoomable = false;
            }
        });
        this._mode = EditingMode.NONE;
    }
    execCommandMove() {
        this._mode = EditingMode.MOVE;
        this._cropper.options.zoomable = true;
        this._cropper.setDragMode('move');
    }
    execCommandCrop() {
        this._mode = EditingMode.CROP;
        this._cropper.options.zoomable = false;
        this._cropper.setDragMode('crop');
    }
    execCommandRotate() {
        this._mode = EditingMode.ROTATE;
        this._cropper.options.zoomable = false;
        this._cropper.setDragMode('none');
    }
    execCommandRotateLeft() {
        this._cropper.rotate(-45);
    }
    execCommandRotateRight() {
        this._cropper.rotate(45);
    }
    execCommandFlipHorizontal() {
        this._cropper.currentScaleX = -(this._cropper.currentScaleX || 1);
        this._cropper.scaleX(this._cropper.currentScaleX);
    }
    execCommandFlipVertical() {
        this._cropper.currentScaleY = -(this._cropper.currentScaleY || 1);
        this._cropper.scaleY(this._cropper.currentScaleY);
    }
    execCommandApply() {
        this._data = this._cropper.getCroppedCanvas().toDataURL();
        this._canvas.src = this._data;
        this._mode = EditingMode.PREVIEW;
        this._cropper.destroy();
        this._cropper = null;
        this.change.emit(this._data);
    }
    execCommandCancel() {
        this._mode = EditingMode.PREVIEW;
        this._cropper.destroy();
        this._cropper = null;
    }
    startRotate() {
        let cropperCanvas = this._el.shadowRoot.querySelector('.cropper-canvas');
        cropperCanvas._rotate = true;
    }
    doRotate(event) {
        let cropperCanvas = this._el.shadowRoot.querySelector('.cropper-canvas');
        if (!cropperCanvas._rotate) {
            return;
        }
        let rectangle = cropperCanvas.getBoundingClientRect();
        let centerX = rectangle.left + (rectangle.width / 2);
        let centerY = rectangle.top + (rectangle.height / 2);
        let x = event.clientX - centerX;
        let y = event.clientY - centerY;
        let angle = RDR * Math.atan2(y, x);
        let rotation = angle - cropperCanvas._startAngle;
        cropperCanvas._startAngle = angle;
        this._cropper.rotate(rotation);
    }
    stopRotate() {
        let cropperCanvas = this._el.shadowRoot.querySelector('.cropper-canvas');
        cropperCanvas._rotate = false;
    }
    /**
     * Render toolbar.
     */
    renderToolbar() {
        let toolbar = this.toolbar;
        if (!(this.toolbar instanceof Array)) {
            toolbar = this.toolbar.split('|');
        }
        let tools = toolbar;
        let elements = [];
        tools.forEach((tool) => {
            if (!tool.trim()) {
                return;
            }
            switch (tool) {
                case 'separator':
                    elements.push(h("span", { class: "separator" }));
                    break;
                case 'move':
                    elements.push(h("span", { class: this.isModeMove() ? 'active' : '', onClick: () => this.execCommandMove() }, iconMove));
                    break;
                case 'crop':
                    elements.push(h("span", { class: this.isModeCrop() ? 'active' : '', onClick: () => this.execCommandCrop() }, iconCrop));
                    break;
                case 'rotate':
                    elements.push(h("span", { class: this.isModeRotate() ? 'active' : '', onClick: () => this.execCommandRotate() }, iconRotate));
                    break;
                case 'rotate-left':
                    elements.push(h("span", { onClick: () => this.execCommandRotateLeft() }, iconRotateLeft));
                    break;
                case 'rotate-right':
                    elements.push(h("span", { onClick: () => this.execCommandRotateRight() }, iconRotateRight));
                    break;
                case 'flip-horizontal':
                    elements.push(h("span", { onClick: () => this.execCommandFlipHorizontal() }, iconFlipHorizontal));
                    break;
                case 'flip-vertical':
                    elements.push(h("span", { onClick: () => this.execCommandFlipVertical() }, iconFlipVertical));
                    break;
                case 'apply':
                    elements.push(h("span", { onClick: () => this.execCommandApply() }, iconApply));
                    break;
                case 'cancel':
                    elements.push(h("span", { onClick: () => this.execCommandCancel() }, iconCancel));
                    break;
                default:
                    throw new Error(`Unknown tool "${tool}" requested.`);
            }
        });
        return elements;
    }
    isModePreview() {
        return EditingMode.PREVIEW === this._mode;
    }
    isModeEdit() {
        return !this.isModePreview();
    }
    isModeCrop() {
        return EditingMode.CROP === this._mode;
    }
    isModeMove() {
        return EditingMode.MOVE === this._mode;
    }
    isModeRotate() {
        return EditingMode.ROTATE === this._mode;
    }
    isPreviewable() {
        return !!this._data;
    }
    static get is() { return "runopencode-profile-photo-editor"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "_data": {
            "state": true
        },
        "_el": {
            "elementRef": true
        },
        "_mode": {
            "state": true
        },
        "autostart": {
            "type": Boolean,
            "attr": "autostart"
        },
        "getValue": {
            "method": true
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "setValue": {
            "method": true
        },
        "src": {
            "type": String,
            "attr": "src",
            "mutable": true,
            "watchCallbacks": ["handleSrcChange"]
        },
        "toolbar": {
            "type": String,
            "attr": "toolbar"
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:runopencode-profile-photo-editor:**/"; }
}
