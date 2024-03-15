import { Only, Scenario, render, tad } from "@famiprog-foundation/tests-are-demo"
import { Main, TRUE } from "../stories/displayItemOnSeparateRowsIfOverlap/DisplayItemOnSeparateRowsIfOverlap.stories";
import { displayItemOnSeparateRowsIfOverlapStoryTestIds } from "../stories/displayItemOnSeparateRowsIfOverlap/DisplayItemOnSeparateRowsIfOverlap.stories";

export class DisplayItemOnSeparateRowsIfOverlapTestsAreDemo {
    @Scenario("GIVEN there are some segments (items) for which the periods overlap ...")
    async _() { 
        render(<Main/>);
    }

    /**
     * This is the default behavior.
     *
     * @img poza
     */
    
    @Only
    @Scenario("..., AND displayItemOnSeparateRowsIfOverlap is true, WHEN render, THEN they are drawn on different rows, to avoid overlapping")
    async givenTrue() {
        let dropdown = tad.screenCapturing.getByTestId(displayItemOnSeparateRowsIfOverlapStoryTestIds.displayItemOnSeparateRowDropdown);
        tad.userEventWaitable.click(dropdown);
        tad.userEventWaitable.click(tad.withinCapturing(dropdown).getByText(TRUE));
        
    }

    /**
     * The z index of the segments can be specified (via a callback), so that we can have a deterministic order on the z/depth axis. If you customize `displayItemOnSeparateRowsIfOverlap` then you should also use ???.
     *
     * It may also be interesting to play w/ transparency (alpha) of your renderers. E.g. it may be interesting for the ones that are rather on top, to be (a bit) transparent.
     *
     * @img poza
     */
    @Scenario("..., AND displayItemOnSeparateRowsIfOverlap is false, WHEN render, THEN they overlap as well")
    async givenFalse() {
        
    }

    /**
     * An example use case: have something like an expand/collapse for a row. E.g. w/ a +/- button in the table, or expanding the row that is currently selected.
     *
     * @img poza
     */
    @Scenario("..., AND displayItemOnSeparateRowsIfOverlap is a function, THEN it's used to decide about the overlapping behavior")
    async givenFunction() {
    }
}
