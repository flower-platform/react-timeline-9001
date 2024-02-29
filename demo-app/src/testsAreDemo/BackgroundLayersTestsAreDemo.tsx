import { Only, Scenario, render, tad } from "@famiprog-foundation/tests-are-demo";
import { Main, month } from "../stories/backgroundLayer/BackgroundLayer.stories";
import { dateAndHourOfMonth } from "../stories/sampleData";
import {PARENT_ELEMENT, Timeline, getPixelAtTime, getPixelsFromDuration, highlightedIntervalTestIds} from "@famiprog-foundation/react-gantt";
import moment from "moment";

export class BackgroundLayersTestsAreDemo {
    async before() {
        render(<Main/>);
    }
    
    @Scenario("The highlighted intervals are correctly displayed")
    async highlightedIntervalsAreDisplayed() {
        const ganttLeftOffset = PARENT_ELEMENT(tad.getObjectViaCheat(Timeline).props.componentId).getBoundingClientRect().left;

        var interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_0");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfMonth(month, 4)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 4), dateAndHourOfMonth(month, 6)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_1");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfMonth(month, 11)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 11), dateAndHourOfMonth(month, 13)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_2");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfMonth(month, 18)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 18), dateAndHourOfMonth(month, 20)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_3");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfMonth(month, 25)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 25), dateAndHourOfMonth(month, 27)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_4");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfMonth(month, 1)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 1), dateAndHourOfMonth(month, 2)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_5");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfMonth(month, 15)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 15), dateAndHourOfMonth(month, 18)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_6");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfMonth(month, 20, 19)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfMonth(month, 20, 19), dateAndHourOfMonth(month, 21, 10)));
    }

    getPixelsAtDate(date) {
        const timeline = tad.getObjectViaCheat(Timeline);
        return Math.round(getPixelAtTime(moment(date), timeline.getStartDate(), timeline.getEndDate(), timeline.getTimelineWidth(undefined)));
    }
    getPixelsFromDuration(start, end) {
        const timeline = tad.getObjectViaCheat(Timeline);
        return Math.round(getPixelsFromDuration(moment(end).diff(start, "milliseconds"), timeline.getStartDate(), timeline.getEndDate(), timeline.getTimelineWidth(undefined), timeline.getTimelineSnap()));

    }
}