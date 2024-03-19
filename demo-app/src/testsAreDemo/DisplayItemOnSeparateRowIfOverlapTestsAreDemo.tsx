import { Only, Scenario, ScenarioOptions, render, tad } from "@famiprog-foundation/tests-are-demo"
import { FALSE, Main, ONLY_FOR_SELECTED, TRUE, setSelectedRow } from "../stories/displayItemOnSeparateRowIfOverlap/DisplayItemOnSeparateRowIfOverlap.stories";
import { displayItemOnSeparateRowIfOverlapStoryTestIds } from "../stories/displayItemOnSeparateRowIfOverlap/DisplayItemOnSeparateRowIfOverlap.stories";
import { timelineTestids } from "../../../src/timeline";

export class DisplayItemOnSeparateRowIfOverlapTestsAreDemo {
    
    async before() {
        render(<Main/>);
    }

    @Scenario("GIVEN there are some segments (items) for which the periods overlap ...")
    async _() {
    }

    /**
     * This is the default behavior.
     *
     * @img displayItemOnSeparateRowIfOverlap_dropdown_click_true
     */
    @Scenario("..., AND displayItemOnSeparateRowIfOverlap is true, WHEN render, THEN they are drawn on different rows, to avoid overlapping")
    async givenTrue() {
        // Rows expand to fit all the segments
        let ganttBody = tad.screenCapturing.getByTestId(timelineTestids.ganttBody);
        await tad.assertWaitable.equal(tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_0").offsetHeight, 40);
        await tad.assertWaitable.equal(tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1").offsetHeight, 80);
        await tad.assertWaitable.equal(tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_2").offsetHeight, 80);
        
        // Segments that overlapp are positioned on different sub-rows
        let item = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1");
        await tad.assertWaitable.equal(tad.withinCapturing(item).getByTestId(timelineTestids.item + "_3").offsetTop, 0);

        item = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1");
        await tad.assertWaitable.equal(tad.withinCapturing(item).getByTestId(timelineTestids.item + "_11").offsetTop, 40);

        item = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1");
        await tad.assertWaitable.equal(tad.withinCapturing(item).getByTestId(timelineTestids.item + "_4").offsetTop, 0);
    }

    /**
     * The z index of the segments can be specified (via a callback), so that we can have a deterministic order on the z/depth axis. If you customize `displayItemOnSeparateRowIfOverlap` then you should also use ???.
     *
     * It may also be interesting to play w/ transparency (alpha) of your renderers. E.g. it may be interesting for the ones that are rather on top, to be (a bit) transparent.
     *
     * @img displayItemOnSeparateRowIfOverlap_dropdown_click_false
     */
    @Scenario("..., AND displayItemOnSeparateRowIfOverlap is false, WHEN render, THEN they overlap as well")
    async givenFalse() {
        let dropdown = tad.screenCapturing.getByTestId(displayItemOnSeparateRowIfOverlapStoryTestIds.displayItemOnSeparateRowDropdown);
        tad.userEventWaitable.click(dropdown);
        tad.userEventWaitable.click(tad.withinCapturing(dropdown).getByRole("option", { name: FALSE }));

        // Rows are short
        let ganttBody = tad.screenCapturing.getByTestId(timelineTestids.ganttBody);
        await tad.assertWaitable.equal(tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1").offsetHeight, 40);
        await tad.assertWaitable.equal(tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_2").offsetHeight, 40);
        
        // All segments are positioned on the same subrow, even if they overlap
        let item = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1");
        await tad.assertWaitable.equal(tad.withinCapturing(item).getByTestId(timelineTestids.item + "_3").offsetTop, 0);

        item = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1");
        await tad.assertWaitable.equal(tad.withinCapturing(item).getByTestId(timelineTestids.item + "_11").offsetTop, 0);

        item = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1");
        await tad.assertWaitable.equal(tad.withinCapturing(item).getByTestId(timelineTestids.item + "_4").offsetTop, 0);
    }

    /**
     * An example use case: have something like an expand/collapse for a row. E.g. w/ a +/- button in the table, or expanding the row that is currently selected.
     *
     * @img displayItemOnSeparateRowIfOverlap_dropdown_click_function
     */
    @Scenario("..., AND displayItemOnSeparateRowIfOverlap is a function, THEN it's used to decide about the overlapping behavior")
    async givenFunction() {
        let dropdown = tad.screenCapturing.getByTestId(displayItemOnSeparateRowIfOverlapStoryTestIds.displayItemOnSeparateRowDropdown);
        tad.userEventWaitable.click(dropdown);
        tad.userEventWaitable.click(tad.withinCapturing(dropdown).getByRole("option", { name: ONLY_FOR_SELECTED }));
        setSelectedRow(1)

        // All rows are short except the one selected
        let ganttBody = tad.screenCapturing.getByTestId(timelineTestids.ganttBody);
        await tad.assertWaitable.equal(tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_0").offsetHeight, 40);
        await tad.assertWaitable.equal(tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1").offsetHeight, 80);
        await tad.assertWaitable.equal(tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_2").offsetHeight, 40);
        
        // Segments that overlapp are positioned on different sub-rows, on the selected row
        let row = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1");
        await tad.assertWaitable.equal(tad.withinCapturing(row).getByTestId(timelineTestids.item + "_3").offsetTop, 0);

        row = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1");
        await tad.assertWaitable.equal(tad.withinCapturing(row).getByTestId(timelineTestids.item + "_11").offsetTop, 40);

        row = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_1");
        await tad.assertWaitable.equal(tad.withinCapturing(row).getByTestId(timelineTestids.item + "_4").offsetTop, 0);

        // And on the same subrow, on the other not selected rows
        row = tad.withinCapturing(ganttBody).getByTestId(timelineTestids.row + "_2");
        await tad.assertWaitable.equal(tad.withinCapturing(row).getByTestId(timelineTestids.item + "_12").offsetTop, 0);
        await tad.assertWaitable.equal(tad.withinCapturing(row).getByTestId(timelineTestids.item + "_6").offsetTop, 0);
    }
}
