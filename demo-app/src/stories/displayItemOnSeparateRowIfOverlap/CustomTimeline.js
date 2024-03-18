import PropTypes from 'prop-types';
import Timeline, { DEFAULT_ROW_CLASS } from '../../../../src/timeline';

export class CustomTimeline extends Timeline {
  
  static propTypes = {
    ...Timeline.propTypes,
    /**
     * @type { number }
     */
    selectedIndex: PropTypes.number
  };

  getRowClassName(rowIndex) {
    return this.props.selectedIndex == rowIndex ? DEFAULT_ROW_CLASS + ' selected-row' : super.getRowClassName(rowIndex); 
  }
}
