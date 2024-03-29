import { Only, Scenario, render, tad } from "@famiprog-foundation/tests-are-demo";
import { Main, month } from "../stories/backgroundLayer/BackgroundLayer.stories";
import { dateAndHourOfMonth } from "../stories/sampleData";
import {Timeline, getPixelAtTime, getPixelsFromDuration} from "@famiprog-foundation/react-gantt";
import moment from "moment";
import { highlightedIntervalTestIds } from "../../../src/components/HighlightedInterval";

export class BackgroundLayersTestsAreDemo {
    async before() {
        render(<Main/>);
    }
    
    @Scenario("The highlighted intervals are correctly displayed")
    async highlightedIntervalsAreDisplayed() {
        const ganttLeftOffset = tad.getObjectViaCheat(Timeline).getGanttLeftOffset();

        var interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_0");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().x - ganttLeftOffset, this.getPixelsAtTime(dateAndHourOfMonth(month, 4)), 1);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 4), dateAndHourOfMonth(month, 6)), 1);

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_1");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().x - ganttLeftOffset, this.getPixelsAtTime(dateAndHourOfMonth(month, 11)), 1);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 11), dateAndHourOfMonth(month, 13)), 1);

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_2");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().x - ganttLeftOffset, this.getPixelsAtTime(dateAndHourOfMonth(month, 18)), 1);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 18), dateAndHourOfMonth(month, 20)), 1);

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_3");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().x - ganttLeftOffset, this.getPixelsAtTime(dateAndHourOfMonth(month, 25)), 1);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 25), dateAndHourOfMonth(month, 27)), 1);

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_4");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().x - ganttLeftOffset, this.getPixelsAtTime(dateAndHourOfMonth(month, 1)), 1);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 1), dateAndHourOfMonth(month, 2)), 1);

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_5");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().x - ganttLeftOffset, this.getPixelsAtTime(dateAndHourOfMonth(month, 15)), 1);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 15), dateAndHourOfMonth(month, 18)), 1);

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_6");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().x - ganttLeftOffset, this.getPixelsAtTime(dateAndHourOfMonth(month, 20, 19)), 1);
        await tad.assertWaitable.approximately(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 20, 19), dateAndHourOfMonth(month, 21, 10)), 1);
    }

    getPixelsAtTime(date) {
        const timeline = tad.getObjectViaCheat(Timeline);
        return getPixelAtTime(moment(date), timeline.getStartDate(), timeline.getEndDate(), timeline.getTimelineWidth(undefined));
    }
    
    getPixelsFromDuration(start, end) {
        const timeline = tad.getObjectViaCheat(Timeline);
        return getPixelsFromDuration(moment(end).diff(start, "milliseconds"), timeline.getStartDate(), timeline.getEndDate(), timeline.getTimelineWidth(undefined), timeline.getTimelineSnap());

    }
}