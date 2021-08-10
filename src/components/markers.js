import React from 'react';
import PropTypes from 'prop-types';
import { getPixelAtTime } from '../utils/timeUtils';
import Marker from './marker';

const VERTICAL_LINE_TYPE = 'vertical-line';
const TIMELINE_VERTICAL_GRID = 'rct9k-marker-vertical-grid';

/**
 * Markers component - display all the markers: current time, vertical grid etc.
 */
export default class Markers extends React.Component {

    getTimebarHeight() {
        // when this function is called for the first time, the timebar is not yet rendered
        let timebar = document.querySelector(`.rct9k-id-${this.props.componentId} .rct9k-timebar`);
        if (!timebar) {
            return 0;
        }
        return timebar.getBoundingClientRect().height;
    }

    getVerticalGrid(width) {
        if (width === 0) {
            return [];
        };

        // show the vertical lines under the timebar
        const top = this.getTimebarHeight();

        // get timebar unit measure and create marker lines
        const timebarUnitMeasure = this.props.timebarResolution.bottom;
        let verticalLineMoment = this.props.startDate.clone();
        verticalLineMoment.startOf(timebarUnitMeasure);
        verticalLineMoment.add(1, timebarUnitMeasure);

        let markers = [];
        while (verticalLineMoment.isBefore(this.props.endDate)) {
            let markerLeft = getPixelAtTime(verticalLineMoment, this.props.startDate, this.props.endDate, width);
            let key = VERTICAL_LINE_TYPE + '-' + markerLeft;
            markers.push({
                left: markerLeft + this.props.leftOffset,
                key: key,
                top: top,
                className: TIMELINE_VERTICAL_GRID
            });

            // increment by unit measure
            verticalLineMoment.startOf(timebarUnitMeasure);
            verticalLineMoment.add(1, timebarUnitMeasure);
        }
        return markers;
    }

    render() {
        const {
            showCursorTime,
            showVerticalGrid,
            getTimelineWidth,
            height,
            mouseSnappedTime,
            startDate,
            endDate,
            leftOffset
        } = this.props;

        // Markers
        const markers = [];

        // show cursor time
        if (showCursorTime && mouseSnappedTime) {
            const cursorPix = getPixelAtTime(mouseSnappedTime, startDate, endDate, getTimelineWidth());
            markers.push({
                left: cursorPix + leftOffset,
                key: 1,
                top: 0
            });
        }

        // show vertical grid
        if (showVerticalGrid) {
            let verticalGrid = this.getVerticalGrid(getTimelineWidth());
            if (verticalGrid.length > 0) {
                markers.push(...verticalGrid);
            }
        }

        return (<div>{
            markers.map(m => (
                <Marker key={m.key} height={height} top={m.top} left={m.left} className={m.className} />
            ))
        }</div>);
    }
}

Markers.propTypes = {
    leftOffset: PropTypes.number.isRequired,
    getTimelineWidth: PropTypes.width,
    startDate: PropTypes.object.isRequired, //moment
    endDate: PropTypes.object.isRequired, //moment
    /* Properties only for cursor time */
    showCursorTime: PropTypes.bool,
    mouseSnappedTime: PropTypes.object,
    /* Properties only for vertical grid */
    showVerticalGrid: PropTypes.bool,
    timebarResolution: PropTypes.object,
    height: PropTypes.number,
    componentId: PropTypes.string // A unique key to identify the component. Only needed when 2 grids are mounted.
}