# DefaultItemRenderer

## Style and className

A single style or a single className can be configured for all the items using <code>props.itemStyle</code> or <code>props.itemClassName</code> in **Timeline** that are passed to **DefaultItemRenderer** as <code>props.style</code> and <code>props.className</code>.

## Background

The renderer uses a gradient as a background. The gradient is configured using two colors: the base color, <code>props.item.color</code>, and for the second color we use <code>props.item.gradientBrightness</code> to lighten the base color. <code>props.item.gradientStop</code> is used to indicate the point when the gradient transitions from the first color to the second color and it is a value between 0 and 100. The default order of the colors is [lighter color, base color], but it can be reversed using <code>props.item.reverseDirection</code>.

If the gradient is not wanted, <code>getBackgroundGradient</code> function(see below) can be overriden. In the image below there are two cases:
1. <code>getBackgroundGradient</code> function is overriden and returns <code>props.item.color</code>
2. default behaviour

![Background](https://user-images.githubusercontent.com/68424941/135446554-901b882f-0716-41c4-989a-1da1028a1598.png)

## Glow on hover

On mouse hover item, a glow effect appears around the item if <code>props.item.glowOnHover</code> is true.

![Glow](https://user-images.githubusercontent.com/68424941/135447119-2dc7b968-f918-475e-84f5-ec339536d80d.png)

## Functions

### getGradientColor() {

Returns the color used for gradient.

### getGradientBrightness()

Returns the gradient brightness. The gradient uses two colors; one is props.color and the other one is the color brightened by props.item.gradientBrightness percentage(a number between 0 and 100).

### getGradientStop()

Returns a number between 0 and 100 (percentage), where the first gradient color stops.

### getReverseDirection()

If the colors in the gradient should be reversed. Default order of the colors in the gradient: [brighter item.color, item.color].

### getBackgroundGradient()

Create a linear gradient using the base color(calls getGradientColor) and a color obtained adjusting the brightness of that color using getGradientBrightness(). The default order of the colors is [brighter color, color]; this order can be reversed if getReverseDirection() is true.

By default, the background of an item uses a gradient, this method should be overriden if this behaviour is not wanted.

### getGlowOnHover()

Returns a css class used to apply glow on item hover.

### getItemHeight()

Returns the height of an item.

### getStyle()

Returns the style applied to the item.

### getTextColor()

Returns the color of the text. When darker colors are used for the items, the text is not visible. This method returns 'white' when props.item.color is darker, otherwise returns black.

### getTitle()

Returns the title of the item.

### getTooltip()

Returns the text rendered in the tooltip.

### getClassName()

Returns the css classes applied on the item.