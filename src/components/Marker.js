import React from 'react';
import PropTypes from 'prop-types';
import {convertDateToMoment} from '../utils/timeUtils';

/**
 * A `Marker` is a component draws a vertical line.
 * @extends React.Component<Marker.propTypes>
 */
export class Marker extends React.Component {
  static propTypes = {
    /**
     * The position of the marker, as date (numeric/millis or moment object, cf. `Timeline.props.useMoment`).
     * @type { object | number }
     */
    start: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,

    /**
     * Class name used to render the marker.
     * @type { string }
     */
    className: PropTypes.string,

    /**
     * The height of the marker; it's passed by the parent.
     * @type { number }
     */
    height: PropTypes.number,

    /**
     * `Marker` uses absolute positioning, thus it needs the `top` property
     * to set the top edge if the element. It's passed by the parent.
     * @type { number }
     */
    top: PropTypes.number,

    /**
     * It's passed by parent. This function allows the conversion of `start` (time) property to pixels.
     * @type { Function }
     */
    calculateHorizontalPosition: PropTypes.func.isRequired,

    /**
     * It's passed by parent. If true timeline will try to minimize re-renders (e.g: the displayed timeline interval changes).
     * @type { boolean }
     */
    shouldUpdate: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    height: undefined,
    top: undefined,
    calculateHorizontalPosition: () => {},
    shouldUpdate: false
  };

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.shouldUpdate ||
      this.props.height !== nextProps.height ||
      this.props.top !== nextProps.top ||
      !convertDateToMoment(this.props.start).isSame(convertDateToMoment(nextProps.start).valueOf())
    ) {
      return true;
    }
    return false;
  }

  /**
   * @returns { object } style
   */
  getStyle() {
    const {left} = this.props.calculateHorizontalPosition(this.props.start);
    return {
      top: this.props.top,
      height: this.props.height,
      left,
      display: left ? 'block' : 'none'
    };
  }

  /**
   * @returns { string } className
   */
  getClassName() {
    return `rct9k-marker ${this.props.className}`;
  }

  render() {
    return <hr className={this.getClassName()} style={this.getStyle()} />;
  }
}
