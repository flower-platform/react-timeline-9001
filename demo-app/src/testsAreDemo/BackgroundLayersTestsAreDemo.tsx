import { Only, Scenario, render, tad } from "@famiprog-foundation/tests-are-demo";
import { Main } from "../stories/backgroundLayer/BackgroundLayer.stories";
import { dateAndHourOfCurrentMonth } from "../stories/sampleData";
import {PARENT_ELEMENT, Timeline, getPixelAtTime, getPixelsFromDuration, highlightedIntervalTestIds} from "@famiprog-foundation/react-gantt";
import moment from "moment";

export class BackgroundLayersTestsAreDemo {
    async before() {
        render(<Main/>);
    }
    
    @Only()
    @Scenario("The highlighted intervals are correctly displayed")
    async highlightedIntervalsAreDisplayed() {
        const ganttLeftOffset = PARENT_ELEMENT(tad.getObjectViaCheat(Timeline).props.componentId).getBoundingClientRect().left;

        var interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_0");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfCurrentMonth(4)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfCurrentMonth(4), dateAndHourOfCurrentMonth(6)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_1");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfCurrentMonth(11)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfCurrentMonth(11), dateAndHourOfCurrentMonth(13)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_2");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfCurrentMonth(18)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfCurrentMonth(18), dateAndHourOfCurrentMonth(20)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_3");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfCurrentMonth(25)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfCurrentMonth(25), dateAndHourOfCurrentMonth(27)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_4");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfCurrentMonth(1)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfCurrentMonth(1), dateAndHourOfCurrentMonth(2)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_5");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfCurrentMonth(15)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfCurrentMonth(15), dateAndHourOfCurrentMonth(18)));

        interval = tad.screenCapturing.getByTestId(highlightedIntervalTestIds.interval + "_6");
        await tad.assertWaitable.exists(interval);
        await tad.assertWaitable.equal(Math.round(interval.getBoundingClientRect().x - ganttLeftOffset), this.getPixelsAtDate(dateAndHourOfCurrentMonth(20, 19)));
        await tad.assertWaitable.equal(interval.getBoundingClientRect().width, this.getPixelsFromDuration(dateAndHourOfCurrentMonth(20, 19), dateAndHourOfCurrentMonth(21, 10)));
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