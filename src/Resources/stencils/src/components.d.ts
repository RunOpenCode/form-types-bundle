/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  Moment,
} from './typings/moment';


export namespace Components {

  interface RunopencodeDateRangeType {
    'footer': boolean;
    'format': string;
    'maxDate': Moment | String | Number | Date;
    'maxDays': number | null;
    'minDate': Moment | String | Number | Date;
    'minDays': number | null;
    'numberOfColumns': number;
    'numberOfMonths': number;
  }
  interface RunopencodeDateRangeTypeAttributes extends StencilHTMLAttributes {
    'footer'?: boolean;
    'format'?: string;
    'maxDate'?: Moment | String | Number | Date;
    'maxDays'?: number | null;
    'minDate'?: Moment | String | Number | Date;
    'minDays'?: number | null;
    'numberOfColumns'?: number;
    'numberOfMonths'?: number;
  }
}

declare global {
  interface StencilElementInterfaces {
    'RunopencodeDateRangeType': Components.RunopencodeDateRangeType;
  }

  interface StencilIntrinsicElements {
    'runopencode-date-range-type': Components.RunopencodeDateRangeTypeAttributes;
  }


  interface HTMLRunopencodeDateRangeTypeElement extends Components.RunopencodeDateRangeType, HTMLStencilElement {}
  var HTMLRunopencodeDateRangeTypeElement: {
    prototype: HTMLRunopencodeDateRangeTypeElement;
    new (): HTMLRunopencodeDateRangeTypeElement;
  };

  interface HTMLElementTagNameMap {
    'runopencode-date-range-type': HTMLRunopencodeDateRangeTypeElement
  }

  interface ElementTagNameMap {
    'runopencode-date-range-type': HTMLRunopencodeDateRangeTypeElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}