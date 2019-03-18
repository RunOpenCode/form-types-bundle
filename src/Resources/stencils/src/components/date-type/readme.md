# runopencode-date-type



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type                                 | Default        |
| ----------------- | ------------------ | ----------- | ------------------------------------ | -------------- |
| `dateFormat`      | `date-format`      |             | `string`                             | `'DD/MM/YYYY'` |
| `disableWeekends` | `disable-weekends` |             | `boolean`                            | `false`        |
| `disabled`        | `disabled`         |             | `boolean`                            | `false`        |
| `maxDate`         | --                 |             | `Date \| Moment \| Number \| String` | `null`         |
| `minDate`         | --                 |             | `Date \| Moment \| Number \| String` | `null`         |
| `placeholder`     | `placeholder`      |             | `string`                             | `null`         |
| `readonly`        | `readonly`         |             | `boolean`                            | `false`        |
| `required`        | `required`         |             | `boolean`                            | `false`        |
| `theme`           | `theme`            |             | `string`                             | `'bootstrap4'` |


## Events

| Event    | Description | Type                |
| -------- | ----------- | ------------------- |
| `change` |             | `CustomEvent<void>` |


## Methods

### `getValue() => Promise<Date>`



#### Returns

Type: `Promise<Date>`



### `setValue(date: Date) => Promise<void>`



#### Parameters

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| `date` | `Date` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
