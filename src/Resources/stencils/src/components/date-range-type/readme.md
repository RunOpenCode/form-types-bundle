# runopencode-date-range-type



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type                                 | Default        |
| ----------------- | ------------------ | ----------- | ------------------------------------ | -------------- |
| `dateFormat`      | `date-format`      |             | `string`                             | `'DD/MM/YYYY'` |
| `disableWeekends` | `disable-weekends` |             | `boolean`                            | `false`        |
| `disabled`        | `disabled`         |             | `boolean`                            | `false`        |
| `maxDate`         | --                 |             | `Date \| Moment \| Number \| String` | `null`         |
| `maxDays`         | `max-days`         |             | `number`                             | `null`         |
| `minDate`         | --                 |             | `Date \| Moment \| Number \| String` | `null`         |
| `minDays`         | `min-days`         |             | `number`                             | `null`         |
| `numberOfMonths`  | `number-of-months` |             | `number`                             | `2`            |
| `placeholder`     | `placeholder`      |             | `string`                             | `null`         |
| `readonly`        | `readonly`         |             | `boolean`                            | `false`        |
| `required`        | `required`         |             | `boolean`                            | `false`        |
| `theme`           | `theme`            |             | `string`                             | `'bootstrap4'` |


## Events

| Event    | Description | Type                |
| -------- | ----------- | ------------------- |
| `change` |             | `CustomEvent<void>` |


## Methods

### `getDateFrom() => Promise<Date>`



#### Returns

Type: `Promise<Date>`



### `getDateTo() => Promise<Date>`



#### Returns

Type: `Promise<Date>`



### `getValue() => Promise<[Date, Date]>`



#### Returns

Type: `Promise<[Date, Date]>`



### `setDateFrom(from: Date) => Promise<void>`



#### Parameters

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| `from` | `Date` |             |

#### Returns

Type: `Promise<void>`



### `setDateTo(to: Date) => Promise<void>`



#### Parameters

| Name | Type   | Description |
| ---- | ------ | ----------- |
| `to` | `Date` |             |

#### Returns

Type: `Promise<void>`



### `setValue(from: Date, to: Date) => Promise<void>`



#### Parameters

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| `from` | `Date` |             |
| `to`   | `Date` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
