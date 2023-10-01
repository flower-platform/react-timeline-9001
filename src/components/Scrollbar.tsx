import React from "react";
import Measure from 'react-measure';

export interface ScrollbarProperties {
    /**
     * E.g. 0
     */
    minScrollPosition: number;

    /**
     * E.g. 100
     */
    maxScrollPosition: number;

    /**
     * E.g. 10
     */
    pageSize: number;

    /**
     * E.g. W/ the previous examples, can have values between 0 and 90
     */
    initialScrollPosition?: number;

    /**
     * Can be both `Direction.HORIZONTAL`(the default value) or `Direction.VERTICAL`
     */
    direction?: Direction;
    
    /**
     * This handler can be used for example to synchronize the scrollbar position with a virtual scroll of another component
     *
     * E.g. W/ the previous examples, the scrollPosition can be between 0 and 90
     */
    onScroll?: (scrollPosition: number) => void;

   /* 
    * The scrollbar component already measures its content. 
    * So the parent component should use this handler
    * if it needs to detect scrollbar size  changes (e.g. when the component becomes invisible 
    * because the current configuration needs no scrollbar)
    */
    onResize?: (scrollbarContentRect: boolean) => void;
}

export enum Direction {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}

const ROUND_FACTOR = 4;

/**
 * If the configuration of the scrollbar doesn't require scrolling 
 * (i.e. the min-max interval is smaller than the pageSize)
 * the Scrollbar component doesn't display nothing. 
 * 
 * @author Daniela Buzatu
 */
export class Scrollbar extends React.Component<ScrollbarProperties, { scrollbarSize: number }> {
   
    static defaultProps = {
        scrollPosition: 0,
        direction: Direction.HORIZONTAL
    }

    _outterDiv: HTMLDivElement;

    constructor(props) {
        super(props);
        this.state = {
            scrollbarSize: 0
        };
    }
    
    /**
     * Designed to be call by the parent component
     * (for example when parent component whats to implement scroll by touching the scrollable container on the mobile devices)
     * 
     * @param delta 
     */
    scrollwithDelta(delta: number) {
        const unit_per_px = this.props.pageSize / this.state.scrollbarSize;
        const pixels_per_unit = this.state.scrollbarSize / this.props.pageSize;
        const scrollPositionInPixels = this.props.direction == Direction.HORIZONTAL ? this._outterDiv.scrollLeft : this._outterDiv.scrollTop;
        const scrollPosition = this.props.minScrollPosition + unit_per_px * scrollPositionInPixels;
        let newScrollPosition = scrollPosition + delta;
        if (newScrollPosition < this.props.minScrollPosition) {
            newScrollPosition = this.props.minScrollPosition;
        } else if (newScrollPosition > this.props.maxScrollPosition) {
            newScrollPosition = this.props.maxScrollPosition;
        } 

        this.setScrollPositionInPx((newScrollPosition - this.props.minScrollPosition) * pixels_per_unit);
    }

    componentWillReceiveProps(nextProps: Readonly<ScrollbarProperties>): void {
        if (nextProps.minScrollPosition != this.props.minScrollPosition || 
            nextProps.maxScrollPosition != this.props.maxScrollPosition ||
            nextProps.pageSize != this.props.pageSize ||
            nextProps.initialScrollPosition != this.props.initialScrollPosition) { 
            this.setScrollPosition(nextProps);
        }
    }

    componentDidUpdate(prevProps: Readonly<ScrollbarProperties>, prevState: Readonly<{ scrollbarSize: number; }>, snapshot?: any): void {
        if (this.state.scrollbarSize != prevState.scrollbarSize) {
            this.setScrollPosition(this.props);
        }
    }

    setScrollPosition(props: ScrollbarProperties) {
        const pixels_per_unit = this.state.scrollbarSize / props.pageSize;
       this.setScrollPositionInPx((props.initialScrollPosition - props.minScrollPosition) * pixels_per_unit);
    }

    setScrollPositionInPx(scrollPositionInPixels) {
        if (!this._outterDiv) {
            return;
        }
        
        // We need this check because else a small flicker appears on the scrollbar when scrolling
        // a scrollbar that is "double binded" to a state variable in the parent component (e.g. in gantt)
        // It is caused by a small precision lost when converting from pixels to client unit and then back again
        const oldScrollPositionInPixels = this.props.direction == Direction.HORIZONTAL ? this._outterDiv.scrollLeft : this._outterDiv.scrollTop;
        if (this.roundDoubleToDecimals(scrollPositionInPixels) == this.roundDoubleToDecimals(oldScrollPositionInPixels)) {
            return;
        }
        
        if (this.props.direction == Direction.HORIZONTAL) {
            this._outterDiv.scrollLeft = scrollPositionInPixels;
        } else {
            this._outterDiv.scrollTop = scrollPositionInPixels;
        }
    }

    onScroll() {
        const unit_per_px = this.props.pageSize / this.state.scrollbarSize;
        const scrollPositionInPixels = this.props.direction == Direction.HORIZONTAL ? this._outterDiv.scrollLeft : this._outterDiv.scrollTop;
        this.props.onScroll(this.props.minScrollPosition + unit_per_px * scrollPositionInPixels);
    }

    getInnerDivSize(): number {
        const pixels_per_unit = this.state.scrollbarSize / this.props.pageSize;
        return (this.props.maxScrollPosition - this.props.minScrollPosition) * pixels_per_unit;
    }

    isScrollbarNeeded(props: ScrollbarProperties): boolean {
        return (props.maxScrollPosition - props.minScrollPosition) > props.pageSize;
    }

    getOutterDivClassName() {
        return this.props.direction == Direction.HORIZONTAL ? "rct9k-horizontal-scrollbar-outter" : "rct9k-vertical-scrollbar-outter";
    }

    roundDoubleToDecimals = (value: number) => {
        if (value == 0) {
            return value;
        }
        let roundFactor = Math.pow(10, ROUND_FACTOR);
        return Math.round(value * roundFactor) / roundFactor;
    }

    render(): React.ReactNode {
        return <Measure
            bounds
            onResize={contentRect => {
                const newSize = contentRect.bounds ? (this.props.direction == Direction.HORIZONTAL ? contentRect.bounds.width : contentRect.bounds.height) : 0;
                if (newSize != this.state.scrollbarSize) {
                    this.setState({ scrollbarSize: newSize });
                }
                this.props.onResize && this.props.onResize(contentRect);
            }}>
            {({ measureRef }) => {
                return (
                    this.isScrollbarNeeded(this.props) ?
                    <div
                        className={this.getOutterDivClassName()}
                        ref={(node) => {
                            measureRef(node);
                            this._outterDiv = node;
                        }
                        }
                        onScroll={() => this.onScroll()}>
                        <div
                            className={this.props.direction == Direction.HORIZONTAL ? "rct9k-horizontal-scrollbar-inner" : "rct9k-vertical-scrollbar-inner"}
                            style={this.props.direction == Direction.HORIZONTAL ? { width: this.getInnerDivSize() } : { height: this.getInnerDivSize() }}>
                        </div>
                    </div>
                    : <></>
                );
            }}
        </Measure>
    }
}