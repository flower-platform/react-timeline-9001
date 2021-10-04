# Default item renderer

## Props

| Name               | Type    | Default | Description                                      |
| -------------------|---------|---------|--------------------------------------------------|
| item               | object  |         | The item to be rendered                          |
| item.title         | string  |         | he item's title                                  | 
| item.glowOnHover   | string  | false   | If the item should glow on item hover            |
| itemHeight         | number  |         | The height of the item                           |
| style              | object  |         | Additional style                                 |
| color              | string  |         | The background color of the item                 |
| opacity            | number  | 1       | Value between 0 and 1, the opacity of the item   |
| useGradient        | boolean | false   | If the item should use gradient for brackground  |
| gradientBrightness | number  | 45      | The gradient uses two colors; one is props.color and the other one is props.color brightened by props.gradientBrightness percentage. Is a number between 0 and 100. |
| gradientStop       | number  | 40      | A number between 0 and 100 (percentage). Where the first gradient color stops. |
| reverseDirection   | boolean | false   | If the order of the gradient colors should be reversed |
| borderColor        | string  | #000000 | The color of the border                          |
| borderThickness    | number  |         | The thickness of the border. The border is not visible without this prop |
| cornerRadius       | number  | 0       | The radius of the item's corners                 |


### Background

The background of the item can be:
* a solid color (1)
* gradient (2)

The gradient is configured using two colors: the base color (props.color) and for the second color we use **props.gradientBrightness** to lighten the base color. **props.gradientStop** is used to indicate the point when the gradient transitions from the first color to the second color and it is a value between 0 and 100. The default order of the colors is lighter color, base color, but it can be reverse using **props.reverseDirection**.

![Background](https://user-images.githubusercontent.com/68424941/135446554-901b882f-0716-41c4-989a-1da1028a1598.png)

### Border

Border is visible only when borderThickness is configured. The height of the items is the same regardless of the border thickness.

1. borderThickness = 0, border is not visible.
2. borderThickness = 1
3. borderThickness = 2

![Border image](https://user-images.githubusercontent.com/68424941/135441967-ff264cf5-034b-44e6-84f0-4c9ffa5048b8.png)

## Opacity

1. Default value, 1
2. opacity = 0.6
3. opacity = 0.35 

![Opacity](https://user-images.githubusercontent.com/68424941/135448653-6786d3ea-9047-49f2-8483-d12a82ecbbba.png)

## Glow on hover

On mouse hover item, a glow effect appears around the item if props.glowOnHover is true.

![Glow](https://user-images.githubusercontent.com/68424941/135447119-2dc7b968-f918-475e-84f5-ec339536d80d.png)

### Corner radius

1. Uses default value: 0. The corners are not rounded.
2. Corner radius value: 7px.

![Corner radius](https://user-images.githubusercontent.com/68424941/135428218-aa252364-08a0-4f3c-b185-6927042453a4.png)


This is a screenshot with random values for all props.

![Demo](https://user-images.githubusercontent.com/68424941/135449025-e087d3c7-1d89-4542-8bbf-a2cf8d9680c2.png)