import React from 'react';
import PropTypes from 'prop-types';
import { getPixelAtTime } from '../utils/timeUtils';
import { getHexColorString } from '../utils/commonUtils';
import Marker from './marker';
import moment from 'moment';

const VERTICAL_LINE_TYPE = 'vertical-line';
const TIMELINE_VERTICAL_GRID = 'rct9k-marker-vertical-grid';

/**
 * Markers component - display all the markers: current time, vertical grid, "now" indicator.
 */
export default class Markers extends React.Component {

    /**
     * Get the height of the timebar. 
     * @returns {number} height of timerbar
     */
    getTimebarHeight() {
        // when this function is called for the first time, the timebar is not yet rendered
        let timebar = document.querySelector(`.rct9k-id-${this.props.componentId} .rct9k-timebar`);
        if (!timebar) {
            return 0;
        }
        return timebar.getBoundingClientRect().height;
    }

    /**
     * Creates a new marker at markerMoment.
     * The position needs to be adjusted with leftOffset (exclude the the left group list).
     * @param {moment} markerMoment
     * @param {string} key
     * @param {number} top 
     * @param {number} height
     * @param {string} className
     * @param {object} style
     * @returns {Marker} marker
     */
    createMarker(markerMoment, key, top, height, className, style) {
        // get pixel position using timeline width, then add left offset (group offset)
        let markerLeft = getPixelAtTime(markerMoment, this.props.startDate, this.props.endDate, this.props.timelineWidth);
        return {
            left: markerLeft + this.props.leftOffset,
            key,
            top,
            height,
            className,
            style
        };
    }

    /**
     * Calculates the list of markers that creates the vertical grid.
     * This markers are the lines that separates the bottom timebar units.
     * @param {number} width Width of the timeline body
     * @param {number} top 
     * @returns a list of markers
     */
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
            const style = {
                background: getHexColorString(this.props.verticalGridColor),
                width: this.props.verticalGridThickness,
                opacity: this.props.opacity
            }
            const marker = this.createMarker(verticalLineMoment, VERTICAL_LINE_TYPE + '-' + verticalLineMoment, top,
                this.props.height - top, TIMELINE_VERTICAL_GRID, style);
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
            markers.push(this.createMarker(mouseSnappedTime, 1, 0, height));
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
            markers.push(this.createMarker(moment(), 2, top, height - top));
        }

        return (<div>{
            markers.map(m => (
                <Marker key={m.key} height={m.height} top={m.top} left={m.left} className={m.className} style={m.style} />
            ))
        }</div>);
    }
}

Markers.propTypes = {
    leftOffset: PropTypes.number.isRequired,
    timelineWidth: PropTypes.number.isRequired,
    startDate: PropTypes.object.isRequired, //moment
    endDate: PropTypes.object.isRequired, //moment
    /* Properties only for cursor time */
    showCursorTime: PropTypes.bool,
    mouseSnappedTime: PropTypes.object,
    /* Properties only for vertical grid */
    showVerticalGrid: PropTypes.bool,
    verticalGridColor: PropTypes.oneOf(PropTypes.number, PropTypes.string),
    verticalGridThickness: PropTypes.number,
    verticalGridOpacity: PropTypes.number,
    timebarResolution: PropTypes.object,
    height: PropTypes.number,
    componentId: PropTypes.string, // A unique key to identify the component. Only needed when 2 grids are mounted.
    /* Properties only for now indicator */
    showNowIndicator: PropTypes.bool
}

Markers.defaultProps = {
    verticalGridColor: 0xCCCCCC,
    verticalGridThickness: 1,
    verticalGridOpacity: 1,
    showNowIndicator: false,
    showCursorTime: false,
    showVerticalGrid: false
}