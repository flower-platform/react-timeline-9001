import React from 'react';
import PropTypes from 'prop-types';
const Color = require('color');

const ITEM_GLOW_CLS = 'rct9k-item-glow';

/**
 * Default values for gradient properties (in item).
 * defaultProps couldn't be used in this case because it doesn't merge the value
 * instead it replaces the value.
 */
const DEFAULT_COLOR = '#2185d0';
const DEFAULT_GRADIENT_BRIGHTNESS = 45;
const DEFAULT_GRADIENT_STOP = 40;
const DEFAULT_REVERSE_DIRECTION = false;

/**
 * Default item renderer class
 * @param {object} props - Component props
 * @param {number} props.itemHeight - The height of the item.
 * @param {object} props.item - The item to be rendered
 * @param {string} props.item.title - The item's title
 * @param {string} props.item.color - The color used for gradient
 * @param {number} props.item.gradientBrightness - Percentage use to lighten the color; the resulted color is used in gradient
 * @param {number} props.item.gradientStop - Percentage; where the first gradient color stops
 * @param {boolean} props.item.reverseDirection - If gradient colors should be reversed
 * @param {boolean} props.item.glowOnHover - If the item should glow on item hover
 */
export class DefaultItemRenderer extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    itemHeight: PropTypes.number
  };

  /**
   * Returns the color used for gradient.
   * @default DEFAULT_COLOR
   */
  getGradientColor() {
    return this.props.item.color ? this.props.item.color : DEFAULT_COLOR;
  }

  /**
   * Returns the gradient brightness. The gradient uses two colors; one is props.color and the other one
   * is the color brightened by props.item.gradientBrightness percentage. Is a number between 0 and 100.
   * @default DEFAULT_GRADIENT_BRIGHTNESS
   */
  getGradientBrightness() {
    return this.props.item.gradientBrightness ? this.props.item.gradientBrightness : DEFAULT_GRADIENT_BRIGHTNESS;
  }

  /**
   * Returns a number between 0 and 100 (percentage), where the first gradient color stops.
   * @default DEFAULT_GRADIENT_STOP
   */
  getGradientStop() {
    return this.props.item.gradientStop ? this.props.item.gradientStop : DEFAULT_GRADIENT_STOP;
  }

  /**
   * If the colors in the gradient should be reversed.
   * Default order of the colors in the gradient: [brighter item.color, item.color]
   * @default DEFAULT_REVERSE_DIRECTION
   */
  getReverseDirection() {
    return this.props.item.reverseDirection ? this.props.item.reverseDirection : DEFAULT_REVERSE_DIRECTION;
  }

  /**
   * Create a linear gradient using the base color(calls getGradientColor) and a color obtained adjusting
   * the brightness of that color using getGradientBrightness(). The default order of the colors is
   * [brighter color, color]; this order can be reversed if getReverseDirection() is true.
   * 
   * By default, the background of an item uses a gradient, this method should be overriden if this behaviour is not wanted.
   * @returns {string} linear gradient
   */
  getBackgroundGradient() {
    let colors = [
      Color(this.getGradientColor())
        .lightness(this.getGradientBrightness())
        .hexString(),
      this.getGradientColor()
    ];
    if (this.getReverseDirection()) {
      colors.reverse();
    }

    return ('linear-gradient(' + colors[0] + ' ' + this.getGradientStop() + '%, ' + colors[1] + ')');
  }

  /**
   * Returns the style of the item.
   */
  getStyle() {
    // subtract 10 because of the margin (see rct9k-items-inner class in style.css)
    const itemHeight = this.props.itemHeight ? this.props.itemHeight - 10 : 'auto';

    return {
      ...this.props.style,
      height: itemHeight,
      background: this.getBackgroundGradient()
    }
  }

  /**
   * Returns the css classes applied on the item.
   */
  getClassName() {
    let className = this.props.className;
    if (this.props.item.glowOnHover) {
      className += ' ' + ITEM_GLOW_CLS;
    }
    return className;
  }

  /**
   * Returns the title of the item.
   */
  getTitle() {
    return this.props.item.title;
  }

  render() {
    return (
      <span className={this.getClassName()} style={this.getStyle()} title={this.props.item.tooltip ? this.props.item.tooltip : ""}>
        <span className="rct9k-item-renderer-inner">{this.getTitle()}</span>
      </span>
    );
  }
}

/**
 * Default group (row) renderer class
 * @param {object} props - Component props
 * @param {object} props.group - The group to be rendered
 * @param {string} props.group.title - The group's title
 * @param {string} props.group.id - The group's id
 * @param {?...object} props.rest - Any other arguments for the span tag
 */
export const DefaultGroupRenderer = props => {
  const {group, ...rest} = props;

  return (
    <span data-group-index={group.id} {...rest}>
      <span>{group.title}</span>
    </span>
  );
};
