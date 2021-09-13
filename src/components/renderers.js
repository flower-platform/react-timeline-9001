import React from 'react';
import {adjustBrightness} from '../utils/commonUtils';
import PropTypes from 'prop-types';

const ITEM_GLOW_CLS = 'rct9k-item-glow';
const TIMELINE_ITEM_BORDER_STYLE = 'solid';

/**
 * Default item renderer class
 * @param {object} props - Component props
 * @param {number|string} props.color - The background color of the item
 * @param {boolean} props.useGradient - If the item should use gradient for brackground
 * @param {number} props.gradientBrightness - Percentage use to lighten the color; the resulted color is used in gradient
 * @param {number} props.gradientBrightness - Percentage; wehere the first gradient color stops
 * @param {boolean} props.reverseDirection - If gradient colors should be reversed
 * @param {number|string} props.borderColor - The color of the border
 * @param {number} props.borderThickness - The thickness of the border
 * @param {number} props.cornerRadius - The radius of the item's corners.
 * @param {number} props.itemHeight - The height of the item.
 * @param {object} props.item - The item to be rendered
 * @param {string} props.item.title - The item's title
 * @param {boolean} props.item.glowOnHover - If the item should glow on item hover
 * @param {?...object} props.rest - Any other arguments for the span tag
 */
export class DefaultItemRenderer extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    color: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    borderColor: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    /**
     * Gradient properties for item.
     */
    useGradient: PropTypes.bool,
    // A number between 0 and 100. It's a percentage used to compute
    // a lighter color than the given color. The resulted color is used in gradient.
    gradientBrightness: PropTypes.number,
    // A number between 0 and 100, where the first color in the gradient stops.
    gradientStop: PropTypes.number,
    // Default colors in gradient: lighter color, color. The order can be reversed: color, lighter color.
    reverseDirection: PropTypes.bool
  };

  static defaultProps = {
    useGradient: false,
    gradientStop: 40,
    gradientBrightness: 45,
    reverseDirection: true,
    borderColor: 0x000000,
    cornerRadius: 0,
    opacity: 1
  };

  constructor(props) {
    super(props);
    this.state = {style: {}};
  }

  componentWillMount() {
    const background = this.getBackground();
    const border = this.getBorder();
    this.setState({
      style: {
        ...this.state.style,
        background,
        ...border
      }
    });
  }

  componentDidUpdate(previousProps, previousState) {
    let background, border;
    if (
      this.props.color != previousProps.color ||
      this.props.useGradient != previousProps.useGradient ||
      this.props.gradientBrightness != previousProps.gradientBrightness ||
      this.props.reverseDirection != previousProps.reverseDirection ||
      this.props.gradientStop != previousProps.gradientStop
    ) {
      background = this.getBackground();
    }

    if (this.props.item.borderColor != previousProps.item.borderColor) {
      border = this.getBorder();
    }

    if (background !== undefined || border !== undefined) {
      this.setState({
        style: {
          ...this.state.style,
          ...border,
          background
        }
      });
    }
  }

  /**
   * Create a linear gradient using the received color and a color obtained adjusting the brightness
   * of that color using props.gradientBrightness. The order is [adjusted color, received color];
   * this order can be reversed using reverseDirection.
   * @param {*} color hex or decimal color reprezentation
   * @param {boolean} reverseDirection used to reverse the order of the colors in the gradient.
   * @returns {string} linear gradient
   */
  getGradient(color, reverseDirection) {
    let colors = [adjustBrightness(color, this.props.gradientBrightness), color];
    if (reverseDirection) {
      colors.reverse();
    }
    return (
      'linear-gradient(' +
      colors[0] +
      ' ' +
      (this.props.gradientStop === undefined ? '' : this.props.gradientStop + '%') +
      ', ' +
      colors[1] +
      ')'
    );
  }

  /**
   * If this.props.useGradient true, create gradient using props.color; otherwise return the color.
   * @returns background style
   */
  getBackground() {
    if (this.props.useGradient) {
      return this.getGradient(this.props.color, this.props.reverseDirection);
    } else {
      return this.props.color;
    }
  }

  /**
   * Create border style: borderThickness, cornerRadius and borderColor.
   * @returns border style
   */
  getBorder() {
    let border = {
      borderRadius: this.props.cornerRadius,
      borderWidth: this.props.borderThickness,
      borderStyle: this.props.borderThickness !== undefined ? TIMELINE_ITEM_BORDER_STYLE : '',
      borderColor: this.props.borderColor
    };
    return border;
  }

  render() {
    const {
      item,
      className,
      useGradient,
      opacity,
      gradientBrightness,
      gradientStop,
      color,
      borderColor,
      borderThickness,
      reverseDirection,
      glowOnHover,
      cornerRadius,
      rowOffset,
      itemHeight,
      ...rest
    } = this.props;

    let classList = className;
    if (item.glowOnHover) {
      classList += ' ' + ITEM_GLOW_CLS + ' ';
    }

    return (
      <span
        {...rest}
        className={classList}
        style={{
          ...this.state.style,
          opacity,
          height: item.title ? '' : itemHeight - 6, // -6 because of the margins
          width: 'inherit'
        }}
        title={item.tooltip ? item.tooltip : ''}>
        <span className="rct9k-item-renderer-inner">{item.title}</span>
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
