import React from 'react';
import PropTypes from 'prop-types';
// TODO CSR: de folosit import, pt uniformitate
const Color = require('color');

// TODO CSR: (cam) toate componentele din renderers.js de fapt noi le-am facut sau modernizat. Nu vad cum s-ar putea intampla in viitor sa vina din ac fisier o modificare din upstream.
// vreau deci sa renuntam la el si sa folosim modul standard de 1 fisier = 1 comp (clasa in cazul nostru). Cum ar fi asta. De facut similar si pt ceilalti rendereri.
// apoi din nume scapam de "Default". Nu recomandam userului sa il suprascrie. Insa suntem perfect compatibili daca cineva vrea treaba asta. "default" lasa sa se inteleaga ca am recomanda oarecum un "custom"/non default
// va exista deci ItemRenderer.js, care contine clasa ItemRenderer. Idem pt celelalte

const DEFAULT_ITEM_RENDERER_CLS = 'rct9k-item-renderer';
const ITEM_GLOW_CLS = 'rct9k-item-glow';

/**
 * Default values for gradient properties (in item).
 * defaultProps couldn't be used in this case because it doesn't merge the value
 * instead it replaces the value.
 */
const DEFAULT_COLOR = '#3791D4';
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
 * @param {string} props.item.tooltip - The item's tooltip
 * @param {number} props.item.gradientBrightness - Percentage use to lighten the color; the resulted color is used in gradient
 * @param {number} props.item.gradientStop - Percentage; where the first gradient color stops
 * @param {boolean} props.item.reverseDirection - If gradient colors should be reversed
 * @param {boolean} props.item.glowOnHover - If the item should glow on item hover
 */
export default class DefaultItemRenderer extends React.Component {
  static propTypes = {
    /**
     * The properties from item are optional, i.e. you may use these and/or other fields, provided you extend this class.
     *
     * `title` and `tooltip` are strings
     *
     * `color` is a string, `gradientBrightness` and `gradientStop` are numbers that can have values between 0 and 100, `reverseDirection` is a boolean.
     * These properties are used to show the background of the segment as a gradient.
     *
     * `glowOnHover` is a boolean, used to show a glow effect arround the segment (item) when the mouse is moved over the segment
     */
    item: PropTypes.shape({
      // TODO CSR: devin proprietati ale renderului. Renderul nu va mai folosi ".item". @see ce am zis in timeline.js.
      // Le dublam cu functii, e.g. getGradientStop(). Motivul: sa poate modifica cineva acest lucru,
      // daca suprascrie clasa. Caci o subclasa nu poate "override" props; decat daca se trece prin astfel de functii. Nu dublam doc la functii. Zicem doar:
      // Getter for the corresponding prop, to allow override by subclass.
      title: PropTypes.string,
      color: PropTypes.string,
      tooltip: PropTypes.string,
      gradientBrightness: PropTypes.number,
      gradientStop: PropTypes.number,
      reverseDirection: PropTypes.bool,
      glowOnHover: PropTypes.bool
    }).isRequired,
    /**
     * The style of the segment used to render the segment (item).
     */
    style: PropTypes.object,
    /**
     * Class name segment used to render the segment (item).
     */
    className: PropTypes.string,
    /**
     * The height of the segment (item) in pixels.
     */
    itemHeight: PropTypes.number
  };

  /**
   * Returns the base color (item.color) used for gradient.
   * @default DEFAULT_COLOR
   */
  getGradientColor() {
    // TODO CSR: defaulturile nu vor sta in getter; ci in propDefaults
    return this.props.item.color || DEFAULT_COLOR;
  }

  /**
   * Returns the gradient brightness (a number between 0 and 100). The gradient uses two colors; one is getGradientColor() and the other one
   * is the color brightened by props.item.gradientBrightness percentage.
   * @default DEFAULT_GRADIENT_BRIGHTNESS
   */
  getGradientBrightness() {
    return this.props.item.gradientBrightness || DEFAULT_GRADIENT_BRIGHTNESS;
  }

  /**
   * Returns a number between 0 and 100 (percentage from the height of the item) and it represents the point where the first color stops in the gradient.
   * @default DEFAULT_GRADIENT_STOP
   */
  getGradientStop() {
    return this.props.item.gradientStop || DEFAULT_GRADIENT_STOP;
  }

  /**
   * If the colors in the gradient should be reversed.
   * Default order of the colors in the gradient: brighter gradient color, gradient color.
   * @default DEFAULT_REVERSE_DIRECTION
   * @return boolean
   */
  getReverseDirection() {
    return this.props.item.reverseDirection || DEFAULT_REVERSE_DIRECTION;
  }

  /**
   * Returns the color of the text. This method returns 'white' when the background is darker,
   * otherwise returns black.
   */
  getTextColor() {
    return Color(this.getGradientColor()).light() ? 'black' : 'white';
  }

  /**
   * Create a linear gradient using the base color (calls getGradientColor()) and a color obtained adjusting
   * the brightness of that color using getGradientBrightness(). The default order of the colors is
   * [brighter gradient color, gradient color]; this order can be reversed if getReverseDirection() is true.
   *
   * By default, the background of an item uses a linear gradient, this method should be overriden if this behaviour is not wanted.
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

    return 'linear-gradient(' + colors[0] + ' ' + this.getGradientStop() + '%, ' + colors[1] + ')';
  }

  /**
   * Returns the height of an item.
   */
  getItemHeight() {
    // subtract 10 because of the margin (see rct9k-items-inner class in style.css)
    return this.props.itemHeight - 10 || 'auto';
  }

  /**
   * Returns the style of the item.
   */
  getStyle() {
    return {
      ...this.props.style,
      color: this.getTextColor(),
      height: this.getItemHeight(),
      background: this.getBackgroundGradient()
    };
  }

  /**
   * Returns a css class used to apply glow on item hover.
   */
  getGlowOnHover() {
    return this.props.item.glowOnHover ? ITEM_GLOW_CLS : '';
  }

  /**
   * Returns the css classes applied on the item.
   */
  getClassName() {
    return DEFAULT_ITEM_RENDERER_CLS + ' ' + this.props.className + ' ' + this.getGlowOnHover();
  }

  /**
   * Returns the title of the item.
   */
  getTitle() {
    return this.props.item.title;
  }

  /**
   * Returns the text rendered in the tooltip.
   */
  getTooltip() {
    return this.props.item.tooltip;
  }

  render() {
    return (
      <span className={this.getClassName()} style={this.getStyle()} title={this.getTooltip()}>
        <span className="rct9k-item-renderer-inner">{this.getTitle()}</span>
      </span>
    );
  }
}

/**
 * Default group (row) renderer class
 * @param {object} props - Component props
 * @param {string} props.labelProperty - The key of the data from group that should be rendered
 * @param {object} props.group - The group to be rendered
 * @param {string} props.group.id - The group's id
 */
export class DefaultGroupRenderer extends React.Component {
  /**
   * Returns the label of the cell.
   */
  getLabel() {
    return this.props.group[this.props.labelProperty];
  }

  render() {
    return (
      <span data-group-index={this.props.group.id}>
        <span>{this.getLabel()}</span>
      </span>
    );
  }
}

/**
 * Default renderer for column header.
 * @param {object} props - Component props
 * @param {object} props.column - The properties of the column
 * @param {string} props.column.headerLabel - The header's label
 */
export class DefaultColumnHeaderRenderer extends React.Component {
  /**
   * Returns the label of the header.
   */
  getLabel() {
    return this.props.column ? this.props.column.headerLabel : '';
  }

  render() {
    return <span>{this.getLabel()}</span>;
  }
}
