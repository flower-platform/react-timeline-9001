import React from 'react';
import PropTypes from 'prop-types';
// TODO CSR: de folosit import, pt uniformitate
// EM: modificat
import Color from 'color';

// TODO CSR: (cam) toate componentele din renderers.js de fapt noi le-am facut sau modernizat. Nu vad cum s-ar putea intampla in viitor sa vina din ac fisier o modificare din upstream.
// vreau deci sa renuntam la el si sa folosim modul standard de 1 fisier = 1 comp (clasa in cazul nostru). Cum ar fi asta. De facut similar si pt ceilalti rendereri.
// apoi din nume scapam de "Default". Nu recomandam userului sa il suprascrie. Insa suntem perfect compatibili daca cineva vrea treaba asta. "default" lasa sa se inteleaga ca am recomanda oarecum un "custom"/non default
// va exista deci ItemRenderer.js, care contine clasa ItemRenderer. Idem pt celelalte
// EM: am creat itemRenderer.js, groupRenderer.js si columnRenderer.js. Am folosit aceeasi conventie de denumire ca pentru fisierelor din proiect.

const ITEM_RENDERER_CLS = 'rct9k-item-renderer';
const ITEM_RENDERER_GLOW_CLS = 'rct9k-item-glow';

/**
 * Item renderer class
 * @param {object} props - Component props
 * @param {number} props.itemHeight - The height of the item.
 * @param {string} props.title - The item's title
 * @param {string} props.color - The color used for gradient
 * @param {string} props.tooltip - The item's tooltip
 * @param {number} props.gradientBrightness - Percentage use to lighten the color; the resulted color is used in gradient
 * @param {number} props.gradientStop - Percentage; where the first gradient color stops
 * @param {boolean} props.reverseDirection - If gradient colors should be reversed
 * @param {boolean} props.glowOnHover - If the item should glow on item hover
 * @param {string} props.className - Class name used to render the segment
 * @param {object} props.style - The style of the segment used to render the segment
 */
export default class ItemRenderer extends React.Component {
  static propTypes = {
    // TODO CSR: devin proprietati ale renderului. Renderul nu va mai folosi ".item". @see ce am zis in timeline.js.
    // Le dublam cu functii, e.g. getGradientStop(). Motivul: sa poate modifica cineva acest lucru,
    // daca suprascrie clasa. Caci o subclasa nu poate "override" props; decat daca se trece prin astfel de functii. Nu dublam doc la functii. Zicem doar:
    // Getter for the corresponding prop, to allow override by subclass.
    // EM: modificat
    /**
     * The title (label) of the segment (item).
     */
    title: PropTypes.string,
    /**
     * Text that will appear in a popup when mouse is moved over the segment (item).
     */
    tooltip: PropTypes.string,
    /**
     * Used to show a glow effect arround the segment (item) when the mouse is moved over the segment (item).
     */
    glowOnHover: PropTypes.bool,
    /**
     * The renderer uses a **linear gradient** (top to bottom) as a background. The gradient is configured
     * using two colors: a base color (`color`) and the base color lightened by a percentage (`gradientBrightness`).
     */
    color: PropTypes.string,
    /**
     * Is a number between 0 and 100; it represents the percentage by which `color` is lightened to obtain the second color used in the gradient.
     */
    gradientBrightness: PropTypes.number,
    /**
     * Returns a number between 0 and 100 (percentage from the height of the item) and it represents the point where the first color stops in the gradient.
     */
    gradientStop: PropTypes.number,
    /**
     * Default order of the colors in the gradient: lighter color, base color.
     * If true, the order of the colors will be reversed.
     */
    reverseDirection: PropTypes.bool,
    /**
     * The style of the segment used to render the segment (item).
     */
    style: PropTypes.object,
    /**
     * Class name used to render the segment (item).
     */
    className: PropTypes.string,
    /**
     * The height of the segment (item).
     */
    itemHeight: PropTypes.string
  };

  static defaultProps = {
    color: '#3791D4',
    gradientBrightness: 45,
    gradientStop: 40,
    reverseDirection: false,
    itemHeight: 'auto',
    glowOnHover: true
  };

  /**
   * Getter for the corresponding prop, to allow override by subclass.
   */
  getTitle() {
    return this.props.title;
  }

  /**
   * Getter for the corresponding prop, to allow override by subclass.
   */
  getTooltip() {
    return this.props.tooltip;
  }

  /**
   * Getter for the corresponding prop, to allow override by subclass.
   */
  getItemHeight() {
    return this.props.itemHeight;
  }

  /**
   * Getter for the corresponding prop, to allow override by subclass.
   */
  getColor() {
    // TODO CSR: defaulturile nu vor sta in getter; ci in propDefaults
    // EM: adaugat defaultProps
    return this.props.color;
  }

  /**
   * Getter for the corresponding prop, to allow override by subclass.
   */
  getGradientBrightness() {
    return this.props.gradientBrightness;
  }

  /**
   * Getter for the corresponding prop, to allow override by subclass.
   */
  getGradientStop() {
    return this.props.gradientStop;
  }

  /**
   * Getter for the corresponding prop, to allow override by subclass.
   */
  getReverseDirection() {
    return this.props.reverseDirection;
  }

  /**
   * Returns the color of the text. This method returns 'white' when the background is darker,
   * otherwise returns black.
   */
  getTextColor() {
    return Color(this.getColor()).light() ? 'black' : 'white';
  }

  /**
   * Create a linear gradient using the base color (calls getColor()) and a color obtained adjusting
   * the brightness of that color using getGradientBrightness(). The default order of the colors is
   * [brighter gradient color, gradient color]; this order can be reversed if getReverseDirection() is true.
   *
   * By default, the background of an item uses a linear gradient, this method should be overriden if this behaviour is not wanted.
   * @returns {string} linear gradient
   */
  getBackgroundGradient() {
    let colors = [
      Color(this.getColor())
        .lightness(this.getGradientBrightness())
        .hexString(),
      this.getColor()
    ];
    if (this.getReverseDirection()) {
      colors.reverse();
    }

    return 'linear-gradient(' + colors[0] + ' ' + this.getGradientStop() + '%, ' + colors[1] + ')';
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
    return this.props.glowOnHover ? ITEM_RENDERER_GLOW_CLS : '';
  }

  /**
   * Returns the css classes applied on the item.
   */
  getClassName() {
    return ITEM_RENDERER_CLS + ' ' + this.props.className + ' ' + this.getGlowOnHover();
  }

  render() {
    return (
      <span className={this.getClassName()} style={this.getStyle()} title={this.getTooltip()}>
        <span className="rct9k-item-renderer-inner">{this.getTitle()}</span>
      </span>
    );
  }
}
