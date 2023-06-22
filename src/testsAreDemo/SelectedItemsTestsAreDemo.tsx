import { Scenario, ScenarioOptions, render, tad } from "@famiprog-foundation/tests-are-demo";
import { Main, tasksCount } from "../stories/basic/Basic.stories";
import Timeline, { timelineTestids as testids } from "../timeline";

/**
* @author Daniela Buzatu
*/
export class SelectedItemsTestsAreDemo {
    async before() {
        render(<Main />);
    }

    @Scenario("GIVEN any previous selection, WHEN I click/right click an item, THEN only the clicked item is selected")
    @ScenarioOptions({ linkWithNextScenario: true })
    async whenClickRightClickAnItem() {
        // left click => element is selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_2"));
        await this.assertOnlyExpectedItemsAreSelected([2]);

        // left click again on another element => the new element is selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"));
        await this.assertOnlyExpectedItemsAreSelected[3];

        // left click again on same element => the same element is selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"));
        await this.assertOnlyExpectedItemsAreSelected([3]);

        tad.showSpotlight({ message: "Right click can be used also for selecting items. It works the same as left click", focusOnLastElementCaptured: false });

        // unselect everything
        tad.demoForEndUserHide();
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));

        // right click => element is selected
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_4"));
        await this.assertOnlyExpectedItemsAreSelected([4], true);

        // right click again on another element => the new element is selected
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"));
        await this.assertOnlyExpectedItemsAreSelected([5], true);

        // right click again on same element => the same element is selected
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"));
        await this.assertOnlyExpectedItemsAreSelected([5], true);
        tad.demoForEndUserShow();
    }

    @Scenario("GIVEN 2 items selected, WHEN I click/right click outside any selectable item, THEN no item is selected")
    async whenClickRightClickOutside() {
        // left click on row => no item is selected
        tad.cc("Left click outside any item");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));
        await tad.showSpotlight({ message: "No item is selected", focusOnLastElementCaptured: false });
        await this.assertOnlyExpectedItemsAreSelected([]);

        await tad.showSpotlight({ message: "Right click outside any item, works the same as left click", focusOnLastElementCaptured: false });

        // select again an item
        tad.demoForEndUserHide();
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_2"));
        // right click on row => no item is selected
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.row + "_1"));
        await tad.showSpotlight({ message: "No item is selected", focusOnLastElementCaptured: false });
        await this.assertOnlyExpectedItemsAreSelected([], true);
        tad.demoForEndUserShow();
    }

    @Scenario("GIVEN any previous selection, WHEN I click/rightClick an item and ctrl/shift is pressed, THEN the clicked item is added/removed from the previous selection")
    @ScenarioOptions({ linkWithNextScenario: true })
    async whenClickRightClickWithCtrlOrShiftAnItem() {
        // left click + CTRL => element is selected
        tad.cc("With CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_2"), { ctrlKey: true });
        await this.assertOnlyExpectedItemsAreSelected([2]);

        // left click + CTRL on another element => the new element is added to selection
        tad.cc("With CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"), { ctrlKey: true });
        await this.assertOnlyExpectedItemsAreSelected([2, 3]);

        // left click + CTRL on same element => the element is removed from selection
        tad.cc("With CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"), { ctrlKey: true });
        tad.cc("With CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_2"), { ctrlKey: true });
        await tad.showSpotlight({ message: "No item selected", focusOnLastElementCaptured: false });
        await this.assertOnlyExpectedItemsAreSelected([]);

        await tad.showSpotlight({ message: "Same as CLICK + CTRL works: CLICK + SHIFT, RIGHT CLICK + CTRL, RIGHT CLICK + SHIFT", focusOnLastElementCaptured: false });
        tad.demoForEndUserHide();
        // left click + SHIFT => element is selected
        tad.cc("With SHIFT Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_2"), { shiftKey: true });
        await this.assertOnlyExpectedItemsAreSelected([2], true);

        // left click + SHIFT on another element => the new element is added to selection
        tad.cc("With SHIFT Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"), { shiftKey: true });
        await this.assertOnlyExpectedItemsAreSelected([2, 3], true);

        // left click + SHIFT on same element => the element is removed from selection
        tad.cc("With SHIFT Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"), { shiftKey: true });
        tad.cc("With SHIFT Key pressed");
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_2"), { shiftKey: true });
        await this.assertOnlyExpectedItemsAreSelected([], true);

        // right click + CTRL => element is added to selection
        tad.cc("With CTRL Key pressed");
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"), { ctrlKey: true });
        await this.assertOnlyExpectedItemsAreSelected([5], true);

        // right click + CTRL on another element => the new element is added to selection
        tad.cc("With CTRL Key pressed");
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_6"), { ctrlKey: true });
        await this.assertOnlyExpectedItemsAreSelected([5, 6], true);

        // right click + CTRL on same element => the element is removed from selection
        tad.cc("With CTRL Key pressed");
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_6"), { ctrlKey: true });
        tad.cc("With CTRL Key pressed");
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"), { ctrlKey: true });
        await tad.showSpotlight({ message: "No item selected", focusOnLastElementCaptured: false });
        await this.assertOnlyExpectedItemsAreSelected([], true);

        // right click + SHIFT => element is selected
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"), { shiftKey: true });
        await this.assertOnlyExpectedItemsAreSelected([5], true);

        // right click + SHIFT on another element => the new element is added to selection
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_6"), { shiftKey: true });
        await this.assertOnlyExpectedItemsAreSelected([5, 6], true);

        // right click + SHIFT on same element => the element is removed from selection
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"), { shiftKey: true });
        await this.assertOnlyExpectedItemsAreSelected([6], true);
        tad.demoForEndUserShow();
    }

    @Scenario("GIVEN 2 items selected, WHEN I click/right click outside any selectable item and ctrl/shift is pressed, THEN selection doesn't change")
    async whenClickRightClickOutsideWithCtrlOrShift() {
        // Given I select another item
        tad.cc("With CTRL Key pressed");
        tad.demoForEndUserHideNext();
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_5"), { ctrlKey: true });

        // When I click outside + Ctrl key => selection doesn't change
        tad.cc("Click outside with CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"), { ctrlKey: true });
        await this.assertOnlyExpectedItemsAreSelected([5, 6]);

        await tad.showSpotlight({ message: "Same as CLICK + CTRL outside any item works: CLICK + SHIFT, RIGHT CLICK + CTRL, RIGHT CLICK + SHIFT outside any item", focusOnLastElementCaptured: false });
        await tad.demoForEndUserHide()
        // When I click outside + Shift key => selection doesn't change
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"), { shiftKey: true });
        await this.assertOnlyExpectedItemsAreSelected([5, 6], true);

        // When I right click outside + Ctrl key => selection doesn't change
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.row + "_1"), { ctrlKey: true });
        await this.assertOnlyExpectedItemsAreSelected([5, 6], true);

        // When I click outside + Shift key => selection doesn't change
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.row + "_1"), { shiftKey: true });
        await this.assertOnlyExpectedItemsAreSelected([5, 6], true);
        tad.demoForEndUserShow();
    }

    @Scenario("GIVEN any previous selection, WHEN I drag to select any items (with left or right button) THEN only those items are selected")
    @ScenarioOptions({ linkWithNextScenario: true })
    async whenDragToSelectItemsWithLeftOrRightMouseButton() {
        // Needed because (don't understand why) inside the spotlight will be displayed also the message from the previous tad.cc, i.e:And it has a brighter color and a shadow effect
        tad.cc("");
        await tad.showSpotlight({ message: "I drag to select item 0 and 3 with left mouse button", focusOnLastElementCaptured: false });
        await this.dragToSelect(0, 1, 3, 3);
        await this.assertOnlyExpectedItemsAreSelected([0, 3]);

        await tad.showSpotlight({ message: "I drag to select item 3 with left mouse button", focusOnLastElementCaptured: false });
        await this.dragToSelect(1, 1, 3, 3);
        await this.assertOnlyExpectedItemsAreSelected([3]);

        await tad.showSpotlight({ message: "Using right mouse button works the same", focusOnLastElementCaptured: false });

        tad.demoForEndUserHide();
        // unselect everything
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));

        await this.dragToSelect(0, 1, 3, 3, true);
        await this.assertOnlyExpectedItemsAreSelected([0, 3], true);

        await this.dragToSelect(1, 1, 3, 3, true);
        await this.assertOnlyExpectedItemsAreSelected([3], true);
        tad.demoForEndUserShow();
    }

    @Scenario("GIVEN any previous selection, WHEN I drag to select outside any item (with left or right button), THEN no item is selected")
    async whenDragToSelectOutsideItemsWithLeftOrRightMouseButton() {
        tad.cc("");
        await tad.showSpotlight({ message: "I drag to select outside any items (using left mouse button)", focusOnLastElementCaptured: false });
        let startingRow = tad.screenCapturing.getByTestId(testids.row + "_0");
        tad.getObjectViaCheat(Timeline).dragStart(startingRow, 5);
        await tad.getObjectViaCheat(Timeline).dragMove(10, 10, 5);
        tad.getObjectViaCheat(Timeline).dragEnd();
        tad.showSpotlight({ message: "No item is selected", focusOnLastElementCaptured: false });
        await this.assertOnlyExpectedItemsAreSelected([]);

        await tad.showSpotlight({ message: "Using right mouse button works the same", focusOnLastElementCaptured: false });

        tad.demoForEndUserHide();
        // given a selected item
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"));

        let row = tad.screenCapturing.getByTestId(testids.row + "_0");
        await tad.fireEventWaitable.mouseDown(row, { clientX: row.getBoundingClientRect().x + 5, clientY: row.getBoundingClientRect().y + 5, button: 2 });
        await tad.fireEventWaitable.mouseMove(row, { clientX: 10, clientY: 10, pageX: 10 });
        await tad.fireEventWaitable.mouseUp(row, { button: 2 });
        await this.assertOnlyExpectedItemsAreSelected([], true);
        tad.demoForEndUserShow();
    }

    @Scenario("GIVEN any previous selection, WHEN I drag to select items (with left or right mouse button) and CTRL/SHIFT is pressed THEN if already in selection => remove it, not in selection => add it")
    @ScenarioOptions({ linkWithNextScenario: true })
    async whenDragToSelectItemsLeftOrRightCtrlOrShift() {
        tad.cc("");
        await tad.showSpotlight({ message: "I draw a rectangle containing items 0, 3 with LEFT mouse button and CTRL pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(0, 1, 3, 3, false, true);
        // await tad.showSpotlight({ message: "I draw a rectangle containing items 3, 6, 9  with LEFT mouse button and CTRL pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(1, 2, 9, 3, false, true);
        await this.assertOnlyExpectedItemsAreSelected([0, 6, 9]);

        tad.showSpotlight({ message: "Same as LEFT button + CTRL works: LEFT + SHIFT, RIGHT + CTRL, RIGHT + SHIFT", focusOnLastElementCaptured: false });

        tad.demoForEndUserHide();
        // unselect everything
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));
        await tad.showSpotlight({ message: "I draw a rectangle containing items 0, 3 with RIGHT mouse button and CTRL pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(0, 1, 3, 3, true, true);
        // await tad.showSpotlight({ message: "I draw a rectangle containing items 3, 6, 9  with RIGHT mouse button and CTRL pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(1, 2, 9, 3, true, true);
        await this.assertOnlyExpectedItemsAreSelected([0, 6, 9], true);

        // unselect everything
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));
        await tad.showSpotlight({ message: "I draw a rectangle containing items 0, 3 with LEFT mouse button and SHIFT pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(0, 1, 3, 3, false, false, true);
        await tad.showSpotlight({ message: "I draw a rectangle containing items 3, 6, 9  with LEFT mouse button and SHIFT pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(1, 2, 9, 3, false, false, true);
        await this.assertOnlyExpectedItemsAreSelected([0, 6, 9], true);

        // unselect everything
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));
        await tad.showSpotlight({ message: "I draw a rectangle containing items 0, 3 with RIGHT mouse button and SHIFT pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(0, 1, 3, 3, true, false, true);
        await tad.showSpotlight({ message: "I draw a rectangle containing items 3, 6, 9  with RIGHT mouse button and SHIFT pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(1, 2, 9, 3, true, false, true);
        await this.assertOnlyExpectedItemsAreSelected([0, 6, 9], true);
        tad.demoForEndUserShow();
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////// Helper methods
    ////////////////////////////////////////////////////////////////////////////////////////

    async dragToSelect(startingRowIndex, endingRowIndex, startingItemIndex, endingItemIndex, rightClick?, ctrlKey = false, shiftKey = false) {
        let startingRow = tad.screenCapturing.getByTestId(testids.row + "_" + startingRowIndex);
        let startingRowRect = startingRow.getBoundingClientRect();
        let endingRow = tad.screenCapturing.getByTestId(testids.row + "_" + endingRowIndex);
        let endingRowRect = endingRow.getBoundingClientRect();
        const startingItemRect = tad.screenCapturing.getByTestId(testids.item + "_" + startingItemIndex).getBoundingClientRect();
        const endingItemRect = tad.screenCapturing.getByTestId(testids.item + "_" + endingItemIndex).getBoundingClientRect();
        const deltaX = endingItemRect.x + endingItemRect.width - startingItemRect.x;
        const deltaY = endingRowRect.y + endingRowRect.height - startingRowRect.y;

        // The drag to select with right click is not a nativelly supported type of drag. So the timeline uses two implementations for supporting
        // 1. Drag to select on left click: based on interact js library triggered by native events dragStart, dragMove, dragEnd. 
        // These events can not be tested using testing-library (we have tried using fireEvent.mouseDown, mouseOver, and mouseUp, but with no success). That's why the "cheat" was needed
        // 2. Drag to select on right click: triggered by mouseDown, mouseMove, mouseUp events
        if (rightClick) {
            tad.demoForEndUserHide();
            await tad.fireEventWaitable.mouseDown(startingRow, { clientX: startingItemRect.x, clientY: startingRowRect.y, button: 2, ctrlKey: ctrlKey, shiftKey: shiftKey });
            // inspired from timeline#dragMove
            // Triggers each 5 ms a mouse move of 5 px on x axes
            let delta;
            for (let i = 0; i < deltaX; i += 5) {
                delta = Math.min(i + 5, deltaX);
                await new Promise(resolve => setTimeout(resolve, 5));
                // we needed to subtract -5 because else the the selection rectangle (that snapps to row) will get till the endingRow + 1, instead endingRow
                await tad.fireEventWaitable.mouseMove(endingRow, { clientX: startingItemRect.x + deltaX, clientY: startingRowRect.y + deltaY - 5, pageX: startingItemRect.x + deltaX });
            }

            await tad.fireEventWaitable.mouseUp(tad.screenCapturing.getByTestId(testids.row + "_1"), { button: 2, ctrlKey: ctrlKey, shiftKey: shiftKey });
            tad.demoForEndUserHide();
        } else {
            // 150 is the group offset
            // we needed to subtract -5 because else the the selection rectangle (that snapps to row) will get till the endingRow + 1, instead endingRow
            tad.getObjectViaCheat(Timeline).dragStart(startingRow, startingItemRect.x - 150);
            await tad.getObjectViaCheat(Timeline).dragMove(deltaX, deltaY - 5, 5);
            tad.getObjectViaCheat(Timeline).dragEnd({ ctrlKey: ctrlKey, shiftKey: shiftKey });
        }
    }

    async assertOnlyExpectedItemsAreSelected(expectedSelectedItems: number[], demoForEndUserHide?) {
        for (var i = 0; i < tasksCount; i++) {
            const item = tad.screenCapturing.getByTestId(testids.item + "_" + i);
            const innerItem = item.getElementsByClassName("rct9k-items-inner")[0];
            if (expectedSelectedItems.indexOf(i) >= 0) {
                tad.cc("Item " + i + " is selected (has resize anchors, brighter color and shadow effect)");
                await tad.assertWaitable.include(Array.from(item.classList), "rct9k-items-outer-selected");
                tad.demoForEndUserHide();
                await tad.assertWaitable.include(Array.from(innerItem.classList), "rct9k-items-selected");
                tad.cc("And it has a brighter color and a shadow effect");
                await tad.assertWaitable.include(innerItem.getAttribute('style').split(";"), " filter: drop-shadow(black 0px 0px 0.5rem) brightness(1.25)");
                !demoForEndUserHide && tad.demoForEndUserShow();
            } else {
                tad.demoForEndUserHide();
                await tad.assertWaitable.notInclude(Array.from(item.classList), "rct9k-items-outer-selected");
                await tad.assertWaitable.notInclude(Array.from(innerItem.classList), "rct9k-items-selected");
                await tad.assertWaitable.notInclude(innerItem.getAttribute('style').split(";"), " filter: drop-shadow(black 0px 0px 0.5rem) brightness(1.25)");
                !demoForEndUserHide && tad.demoForEndUserShow();
            }
        }
    }
}