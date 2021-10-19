# Timeline: Date types

## Props

| Name        | Type             | Default | Description                                    |
| ------------|------------------|---------|----------------------------------------------  |
| useMoment   | Boolean          | true    | If true the dates from props should be moment objects. otherwise they will be dates in milliseconds (numbers) and will be converted internally in moment objects. |
| startDate   | Object or number |         | The visible start date of the timeline as moment object or in milliseconds |
| endDate     | Object or number |         | The visible end date of the timeline as moment object or in milliseconds  |
| items       | Object[]         |         | Items that will be rendered in the grid        |
| rowLayers   | Object[]         |         | List of layers that will be rendered for a row |

Default date fields in an item:
* start - moment object or date in milliseconds(number) - start of an item
* end - moment object or date in milliseconds(number) - end of an item

Default date fields in a row layer:
* start - moment object or date in milliseconds(number) - start of a row layer
* end - moment object or date in milliseconds(number) - end of a row layer

## Functions

> **WARNING** All operations involving the dates mentioned above should pass through the following functions. It is forbidden to manipulate the dates from props directly. These function can be overriden in order to use other fields or for additional logic. 

### getStartDate(startDate: this.props.startDate, useMoment: this.props.useMoment)

It returns the start date of the timeline as moment.

Params:
| Name      | Type             | Description                                                 |
|-----------|------------------|-------------------------------------------------------------|
| startDate | Object or number | The visible start date of the timeline as moment object or in milliseconds. |
| useMoment | Boolean          | Whether the date is already a moment or should be converted.|

### getEndDate(endDate: this.props.endDate, useMoment: this.props.useMoment)

It returns the end date of the timeline as moment.

Params:
| Name      | Type             | Description                                                 |
|-----------|------------------|-------------------------------------------------------------|
| endDate   | Object or number | The visible end date of the timeline as moment object or in milliseconds. |
| useMoment | Boolean          | Whether the date is already a moment or should be converted.|

### getStartFromItem(item, useMoment = this.props.useMoment) 

It returns the start date of an item as moment.

Params:
| Name      | Type     | Description                                                 |
|-----------|----------|-------------------------------------------------------------|
| item      | Object   | Item that will be rendered in the grid.                     |
| useMoment | Boolean  | Whether the date is already a moment or should be converted.|

### getEndFromItem(item, useMoment = this.props.useMoment) 

It returns the end date of an item as moment.

Params:
| Name      | Type     | Description                                                 |
|-----------|----------|-------------------------------------------------------------|
| item      | Object   | Item that will be rendered in the grid.                     |
| useMoment | Boolean  | Whether the date is already a moment or should be converted.|

### setStartToItem(item, newDateAsMoment, useMoment = this.props.useMoment)

Sets the start of the item to newDateAsMoment converted to moment or milliseconds depending on useMoment.

Params:
| Name            | Type     | Description                                                 |
|-----------------|----------|-------------------------------------------------------------|
| item            | Object   | Item that will be rendered in the grid.                     |
| newDateAsMoment | Object   | The new value of the start date as moment.                  |
| useMoment       | Boolean  | Whether the date is already a moment or should be converted.|

### setEndToItem(item, newDateAsMoment, useMoment = this.props.useMoment)

Sets the end of the item to newDateAsMoment converted to moment or milliseconds depending on useMoment.

Params:
| Name            | Type     | Description                                                 |
|-----------------|----------|-------------------------------------------------------------|
| item            | Object   | Item that will be rendered in the grid.                     |
| newDateAsMoment | Object   | The new value of the end date as moment.                    | 
| useMoment       | Boolean  | Whether the date is already a moment or should be converted.|

### getStartFromRowLayer(layer, useMoment = this.props.useMoment) 

It returns the start date of a row layer as moment.

Params:
| Name      | Type     | Description                                                 |
|-----------|----------|-------------------------------------------------------------|
| layer     | Object   | Row layer that will be rendered in the grid.                |
| useMoment | Boolean  | Whether the date is already a moment or should be converted.|

### getEndFromRowLayer(layer, useMoment = this.props.useMoment) 

It returns the end date of a row layer as moment.

Params:
| Name      | Type     | Description                                                 |
|-----------|----------|-------------------------------------------------------------|
| layer     | Object   | Row layer that will be rendered in the grid.                |
| useMoment | Boolean  | Whether the date is already a moment or should be converted.|

### setStartToRowLayer(layer, newDateAsMoment, useMoment = this.props.useMoment)

Sets the start of the layer to newDateAsMoment converted to moment or milliseconds depending on useMoment.

Params:
| Name            | Type     | Description                                                 |
|-----------------|----------|-------------------------------------------------------------|
| layer           | Object   | Row layer that will be rendered in the grid.                |
| newDateAsMoment | Object   | The new value of the end date as moment.                    |
| useMoment       | Boolean  | Whether the date is already a moment or should be converted.|


### setEndToRowLayer(layer, newDateAsMoment, useMoment = this.props.useMoment)

Sets the end of the layer to newDateAsMoment converted to moment or milliseconds depending on useMoment.

Params:
| Name            | Type     | Description                                                 |
|-----------------|----------|-------------------------------------------------------------|
| layer           | Object   | Row layer that will be rendered in the grid.                |
| newDateAsMoment | Object   | The new value of the end date as moment.                    | 
| useMoment       | Boolean  | Whether the date is already a moment or should be converted.|

## Utils functions

### convertDateToMoment(date, useMoment)

Returns the date as moment object. If useMoment is true, the date is already a moment object. This function is used by all getter functions above.

Params:
| Name       | Type             | Description                                                     |
|------------|------------------|-----------------------------------------------------------------|
| date       | Object or number | The date to be converted to moment, it can be already a moment. | 
| useMoment  | Boolean          | Whether the date is already a moment or should be converted.    |

### convertMomentToDateType(dateAsMoment, useMoment)

Returns the date as moment object if useMoment is true, otherwise returns the date in milliseconds.

Params:
| Name         | Type    | Description                                                             |
|--------------|---------|-------------------------------------------------------------------------|
| dateAsMoment | Object  | The new value of the end date as moment.                                | 
| useMoment    | Boolean | Whether the date returned should be a moment object or in milliseconds. |
