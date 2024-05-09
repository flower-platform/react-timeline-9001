import { Scenario, render, tad } from "@famiprog-foundation/tests-are-demo";
import moment from "moment";
import { rightClick } from "./testUtils";
import { contextMenuTestIds } from "../../../src/components/ContextMenu/ContextMenu";
import Timeline, { ZOOM_PERCENT, timelineTestids as testids } from "../../../src/timeline";
import { Main } from "../stories/zoom/Zoom.stories";

export class ZoomTestsAreDemo {

    timeline: Timeline;

    async before() {
        render(<Main />);
        this.timeline = tad.getObjectViaCheat(Timeline);
    }

    private openContextMenu() {
        const firstRow = tad.screenCapturing.getByTestId(testids.row + "_0");
        const clickPosition = { clientX: Math.round(firstRow.getBoundingClientRect().x) + 20, clientY: Math.round(firstRow.getBoundingClientRect().y) + 20 };
        rightClick(firstRow, clickPosition);
    }

    private focusOnTimebar() {
        // focus screenCapturing on timeBar
        tad.screenCapturing.getByTestId(testids.timeBar);
    }

    private calculateExeptedStartEndDate(start: number | moment.Moment, end: number | moment.Moment, zoomIn: boolean) {
        const interval = moment(end).valueOf() - moment(start).valueOf();
        const delta = Math.floor((this.timeline._gridDomNode as Element).getBoundingClientRect().x + this.timeline._grid.props.width / 2) / this.timeline._grid.props.width;
        let deltaInterval = interval * ZOOM_PERCENT;
        if (zoomIn) {
            deltaInterval *= -1;
        }
        let startDate = moment(moment(start).valueOf() + delta * deltaInterval);
        let endDate = moment(moment(end).valueOf() - (1 - delta) * deltaInterval);
        return { exeptedStartDate: startDate, exeptedEndDate: endDate };
    }

    @Scenario("WHEN the gantt was maxim zoom out AND click on zoom out, THEN the startDate and endDate not changed")
    async whenMaxZoomOutClickZoomOut() {
        this.openContextMenu();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_1"));
        this.focusOnTimebar();
        await tad.assertWaitable.equal(moment(this.timeline.props.startDate).valueOf(), moment(this.timeline.state.startDate).valueOf());
        await tad.assertWaitable.equal(moment(this.timeline.props.endDate).valueOf(), moment(this.timeline.state.endDate).valueOf());
    }

    @Scenario("When click zoomIn from context menu, THEN zoomed in AND show the message `Zoomed in` with fade effect.")
    async whenClickZoomIn() {
        this.openContextMenu();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        const { exeptedStartDate, exeptedEndDate } = this.calculateExeptedStartEndDate(this.timeline.state.startDate, this.timeline.state.endDate, false);
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_0"));
        // need to extract the startDate, endDate after zoom, because the scroll update this values
        const { startDate, endDate } = this.timeline.state;
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId(testids.fadeEffect));
        this.focusOnTimebar();
        await tad.assertWaitable.equal(moment(exeptedStartDate).valueOf(), moment(startDate).valueOf());
        await tad.assertWaitable.equal(moment(exeptedEndDate).valueOf(), moment(endDate).valueOf());
    }

    @Scenario("When click zoomOut from context menu, THEN zoomed in AND show the message `Zoomed out` with fade effect.")
    async whenClickZoomOut() {
        this.openContextMenu();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        const { exeptedStartDate, exeptedEndDate } = this.calculateExeptedStartEndDate(this.timeline.state.startDate, this.timeline.state.endDate, true);
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_1"));
        // need to extract the startDate, endDate after zoom, because the scroll update this values
        const { startDate, endDate } = this.timeline.state;
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId(testids.fadeEffect));
        this.focusOnTimebar();
        await tad.assertWaitable.equal(moment(exeptedStartDate).valueOf(), moment(startDate).valueOf());
        await tad.assertWaitable.equal(moment(exeptedEndDate).valueOf(), moment(endDate).valueOf());
    }
}