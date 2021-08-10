import React from 'react';
import PropTypes from 'prop-types';
import { getPixelAtTime } from '../utils/timeUtils';
import Marker from './marker';

import moment from 'moment';

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

    createMarker(markerMoment, key, top, className) {
    	// get pixel position using timeline width, then add left offset (group offset)
        let markerLeft = getPixelAtTime(markerMoment, this.props.startDate, this.props.endDate, this.props.timelineWidth);
        return {
            left: markerLeft + this.props.leftOffset,
            key: key,
            top: top,
            className: className
        };
    }

    getVerticalGrid(width, top) {
        if (width <= 0) {
            return [];
        };

        // get timebar unit measure and create marker lines
        const timebarUnitMeasure = this.props.timebarResolution.bottom;
        let verticalLineMoment = this.props.startDate.clone();
        verticalLineMoment.startOf(timebarUnitMeasure);
        verticalLineMoment.add(1, timebarUnitMeasure);

        let markers = [];
        while (verticalLineMoment.isBefore(this.props.endDate)) {
            let marker = this.createMarker(verticalLineMoment, VERTICAL_LINE_TYPE + '-' + verticalLineMoment, top, TIMELINE_VERTICAL_GRID);
            markers.push(marker);

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
            showNowIndicator,
            timelineWidth,
            height,
            mouseSnappedTime
        } = this.props;

        // Markers
        const markers = [];

        // show cursor time
        if (showCursorTime && mouseSnappedTime) {
            markers.push(this.createMarker(mouseSnappedTime, 1, 0));
        }


        // show the vertical lines and now indicator under the timebar
        const top = this.getTimebarHeight();

        // show vertical grid
        if (showVerticalGrid) {
            let verticalGrid = this.getVerticalGrid(timelineWidth, top);
            if (verticalGrid.length > 0) {
                markers.push(...verticalGrid);
            }
        }

        // show current time
        if (showNowIndicator) {
            markers.push(this.createMarker(moment(), 2, top));
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
    timelineWidth: PropTypes.number,
    startDate: PropTypes.object.isRequired, //moment
    endDate: PropTypes.object.isRequired, //moment
    /* Properties only for cursor time */
    showCursorTime: PropTypes.bool,
    mouseSnappedTime: PropTypes.object,
    /* Properties only for vertical grid */
    showVerticalGrid: PropTypes.bool,
    timebarResolution: PropTypes.object,
    height: PropTypes.number,
    componentId: PropTypes.string, // A unique key to identify the component. Only needed when 2 grids are mounted.
    /* Properties only for now indicator */
    showNowIndicator: PropTypes.bool
}