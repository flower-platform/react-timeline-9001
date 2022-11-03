/**
 * Timeline body/grid
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Grid} from 'react-virtualized';

/**
 * @extends Component<TimelineBodyPropTypes>
 */
class TimelineBody extends Component {
  componentDidMount() {
    this.forceUpdate();
  }
  shouldComponentUpdate(nextProps) {
    const {props} = this;
    if (!props.shallowUpdateCheck) {
      return true;
    }

    if (props.columnCount !== nextProps.columnCount) {
      return true;
    }

    // prettier-ignore
    const shallowChange = props.height !== nextProps.height
      || props.width !== nextProps.width
      || props.rowCount !== nextProps.rowCount;

    if (props.forceRedrawFunc) {
      return shallowChange || props.forceRedrawFunc(props, nextProps);
    }

    return shallowChange;
  }
  render() {
    const {width, columnWidth, height, rowHeight, rowCount, columnCount} = this.props;
    const {grid_ref_callback, cellRenderer} = this.props;

    return (
      <Grid
        ref={grid_ref_callback}
        autoContainerWidth
        cellRenderer={cellRenderer}
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={height}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={width}
      />
    );
  }
}

const TimelineBodyPropTypes = {
  /**
   * The total width of the body; mandatory field.
   * @type { number }
   */
  width: PropTypes.number.isRequired,
  /**
   * Function that returns the width of each column, mandatory field.
   * @type { Function }
   */
  columnWidth: PropTypes.func.isRequired,
  /**
   * The total number of columns, including the timeline (gantt).
   * @type { number }
   */
  columnCount: PropTypes.number,
  /**
   * The total height of the body (without timebar), mandatory field.
   * @type { number }
   */
  height: PropTypes.number.isRequired,
  /**
   * Function that returns the height for each row, mandatory field.
   * @type { Function }
   */
  rowHeight: PropTypes.func.isRequired,
  /**
   * Number of rows in timeline, mandatory field.
   * @type { number }
   */
  rowCount: PropTypes.number.isRequired,
  /**
   * @type { Function }
   */
  grid_ref_callback: PropTypes.func.isRequired,
  /**
   * Renderer for each cell of the grid.
   * @type { Function }
   */
  cellRenderer: PropTypes.func.isRequired,
  /**
   * If true timeline will try to minimize re-renders. Set to false if items don't show up/update on prop change.
   * @type { boolean }
   */
  shallowUpdateCheck: PropTypes.bool,
  /**
   * Function called when shallowUpdateCheck==true. If returns true the timeline will be redrawn.
   * If false the library will decide if redrawing is required,
   * @type { Function }
   */
  forceRedrawFunc: PropTypes.func
};

TimelineBody.propTypes = TimelineBodyPropTypes;

TimelineBody.defaultProps = {
  columnCount: 2,
  shallowUpdateCheck: false,
  forceRedrawFunc: null
};
export default TimelineBody;
