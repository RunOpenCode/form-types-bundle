const e=window.runopencode.h;class c{constructor(){this.labelChecked=null,this.labelUnchecked=null,this.disabled=!1,this.readonly=!1,this.checked=!1}componentDidLoad(){this.input=this.el.querySelector('input[type="checkbox"]'),this.checked=this.input.checked}async toggle(){this.checked=!this.checked,this.input.checked=this.checked,this.change.emit(this.checked)}async check(){this.checked=!0,this.input.checked=!0,this.change.emit(this.checked)}async uncheck(){this.checked=!1,this.input.checked=!1,this.change.emit(this.checked)}async setValue(e){this.checked=e,this.input.checked=e,this.change.emit(this.checked)}async getValue(){return this.checked}handleClick(){this.disabled||this.readonly||this.toggle()}render(){return[e("div",{class:this.checked?"switch checked":"switch unchecked",onClick:this.handleClick.bind(this)},this.labelChecked?e("span",{class:this.checked?"label":"label hidden"},this.labelChecked):"",this.labelUnchecked?e("span",{class:this.checked?"label hidden":"label"},this.labelUnchecked):"",e("div",{class:this.checked?"slider checked":"slider unchecked"}),e("div",{class:"hidden",hidden:!0},e("slot",null)))]}static get is(){return"runopencode-switch-type"}static get encapsulation(){return"shadow"}static get properties(){return{check:{method:!0},checked:{state:!0},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},getValue:{method:!0},labelChecked:{type:String,attr:"label-checked"},labelUnchecked:{type:String,attr:"label-unchecked"},readonly:{type:Boolean,attr:"readonly"},setValue:{method:!0},toggle:{method:!0},uncheck:{method:!0}}}static get events(){return[{name:"change",method:"change",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{padding:calc(var(--runopencode-switch-type-size) / 10);margin:0;width:calc(var(--runopencode-switch-type-size) * 2.2);height:var(--runopencode-switch-type-size);background:var(--runopencode-switch-type-primary-color);border-radius:calc(var(--runopencode-switch-type-size) / 2 + var(--runopencode-switch-type-size) / 10);cursor:pointer;position:relative}.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type, .sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{-webkit-transition:background-color var(--runopencode-switch-type-animation-duration);transition:background-color var(--runopencode-switch-type-animation-duration)}.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type   span.label.sc-runopencode-switch-type{right:0;left:auto}.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type   span.label.sc-runopencode-switch-type{position:absolute;top:0;bottom:0;left:0;line-height:var(--runopencode-switch-type-size);font-size:calc(var(--runopencode-switch-type-size) / 2);color:#fff;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:calc(var(--runopencode-switch-type-size) / 5)}.sc-runopencode-switch-type-h   div.slider.sc-runopencode-switch-type{border-radius:100%;width:var(--runopencode-switch-type-size);height:var(--runopencode-switch-type-size);background-color:#fff;-webkit-box-shadow:0 1px 0 2px rgba(0,0,0,.05),0 1px 2px 2px rgba(0,0,0,.1),0 1px 0 2px rgba(0,0,0,.05);box-shadow:0 1px 0 2px rgba(0,0,0,.05),0 1px 2px 2px rgba(0,0,0,.1),0 1px 0 2px rgba(0,0,0,.05)}.sc-runopencode-switch-type-h   div.slider.checked.sc-runopencode-switch-type{-webkit-transform:translateX(calc(var(--runopencode-switch-type-size) * 2.2 - var(--runopencode-switch-type-size)));transform:translateX(calc(var(--runopencode-switch-type-size) * 2.2 - var(--runopencode-switch-type-size)))}.sc-runopencode-switch-type-h   div.slider.checked.sc-runopencode-switch-type, .sc-runopencode-switch-type-h   div.slider.unchecked.sc-runopencode-switch-type{-webkit-transition:all var(--runopencode-switch-type-animation-duration);transition:all var(--runopencode-switch-type-animation-duration)}.sc-runopencode-switch-type-h   .hidden.sc-runopencode-switch-type{display:none!important}.secondary.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-secondary-color)}.secondary.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.success.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-success-color)}.success.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.danger.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-danger-color)}.danger.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.warning.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-warning-color)}.warning.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.info.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-info-color)}.info.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.light.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-light-color)}.light.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}.dark.sc-runopencode-switch-type-h   div.switch.sc-runopencode-switch-type{background:var(--runopencode-switch-type-dark-color)}.dark.sc-runopencode-switch-type-h   div.switch.unchecked.sc-runopencode-switch-type{background:var(--runopencode-switch-type-unchecked-color)}"}}export{c as RunopencodeSwitchType};