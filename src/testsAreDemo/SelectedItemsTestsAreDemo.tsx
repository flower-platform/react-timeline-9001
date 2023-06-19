import { Scenario, render, tad } from "@famiprog-foundation/tests-are-demo";
import { timelineTestids as testIds} from "../timeline";
import { Main, tasksCount } from "../stories/basic/Basic.stories";

export class SelectedItemsTestsAreDemo {
    async before() {
        render(<Main />);
    }

    @Scenario("GIVEN no item selected, WHEN I clicks/right clicks an item, THEN only the clicked item is selected")
    async whenClickRightClickAnItem1() {
        // tad.cc("Click");
        tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testIds.item + "_2"));

        tad.assertWaitable.include(tad.screenCapturing.getByTestId(testIds.item + "_2").classList, "rct9k-items-outer-selected1");


        // for (var i = 0; i < tasksCount; i++) {
        //     const segmentOuter = tad.screenCapturing.getByTestId(testIds.item + "_" + i);
        //     const segment = tad.withinCapturing(segmentOuter).findByRole("span");
        //     if (i == 2) {
        //         //TODO DB: check if selected
        //         tad.assertWaitable.containsAllKeys(segmentOuter.classList, ["rct9k-items-outer-selected"]);
        //     } else {
        //          //TODO DB: check if not selected
        //          tad.assertWaitable.containsAllKeys(segmentOuter.classList, ["rct9k-items-outer-selected"]);
        //     }
        // }

    }

    @Scenario("GIVEN 2 items selected, WHEN I clicks/right clicks another item or one item from the selection, THEN only the clicked item is selected")
    async whenClickRightClickAnItem2() {
    }

    @Scenario("GIVEN 2 items selected, WHEN I clicks/right clicks outside any selectable item, THEN no item is selected")
    async whenClickRightClickOutside() {
    }

    @Scenario("GIVEN 2 items selected, WHEN I draw selection rectangle for two items (others or the same) THEN only the items in the selection rectangle are selected")
    async 2() {
    }

    @Scenario("GIVEN 2 items selected, WHEN I draw an empty selection rectangle, THEN no item is selected")
    async 3() {
    }

    // @Scenario("")
    // async 1() {
    // }

}