import { Only, render, Scenario, tad } from "@famiprog-foundation/tests-are-demo";
import { Main } from "../stories/dragToCreate/DragToCreate.stories";
import {Timeline, DRAG_TO_CREATE_ACTION_LABEL, DRAG_TO_CREATE_POPUP_CLOSE_TIME, DRAG_TO_CREATE_POPUP_LABEL_2,timelineTestids, contextMenuTestIds } from "@famiprog-foundation/react-gantt";
import { dragToCreateStoriesTestIds as testIds } from "../stories/dragToCreate/DragToCreate.stories";
import { someTasks } from "../stories/sampleData";

export class DragToCreateTestsAreDemo {

    async before() {
        render(<Main />);
    }

    @Scenario("WHEN click on the menu button, THEN the menu opens with a 'Drag To Create' menu entry")
    async whenClickMenuButton() {
        tad.cc("Click on the menu button");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.menuButton));
        tad.cc("Check if the context menu is open");
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId(contextMenuTestIds.popup));

        tad.cc("Check if exist the 'Drag To Create' action");
        await tad.assertWaitable.equal(tad.screenCapturing.getByTestId(contextMenuTestIds.menuItem + "_0").textContent, DRAG_TO_CREATE_ACTION_LABEL);
        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ openedContextMenuCoordinates: undefined });
    }

    @Scenario("WHEN click on the 'Drag To Create' menu entry, THEN the Gantt goes into the 'drag to create mode' and the drag to create popup appears")
    async whenClickAddMenuEntry() {
        // GIVEN context menu is opened by pressing the hamburger button
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.menuButton));
        
        // WHEN
        tad.cc("Click 'Drag To Create' menu entry");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(contextMenuTestIds.menuItem + "_0"));

	    // THEN
        await tad.assertWaitable.isTrue(tad.getObjectViaCheat(Timeline, 'r9k1').state.dragToCreateMode, "Drag to create mode should be active");
	
	    const popup = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.dragToCreatePopup);
        tad.cc("Check if drag to create popup exists");
        await tad.assertWaitable.exists(popup);
        
        // Check the labels
        await tad.assertWaitable.equal(tad.withinCapturing(popup).getByTestId('r9k1_' + timelineTestids.dragToCreatePopupLabel + "_1").innerHTML, "<b>Click and drag</b> to create a new segment");
        await tad.assertWaitable.equal(tad.withinCapturing(popup).getByTestId('r9k1_' + timelineTestids.dragToCreatePopupLabel + "_2").textContent, DRAG_TO_CREATE_POPUP_LABEL_2);
        await tad.assertWaitable.equal(tad.withinCapturing(popup).getByTestId('r9k1_' + timelineTestids.dragToCreatePopupLabel + "_3").innerHTML, "To <b>cancel</b> you can also click on gantt");
        const cancelButton = tad.withinCapturing(popup).getByTestId('r9k1_' + timelineTestids.dragToCreatePopupCancelButton);
        tad.cc("Check if exists 'Cancel' button");
        await tad.assertWaitable.exists(cancelButton);
        tad.cc("Check if the cancel button is negative");
        await tad.assertWaitable.include(cancelButton.className, "negative");

        // Test auto closing of the popup
        tad.demoForEndUserHide();

        // AND the popup closes after DRAG_TO_CREATE_POPUP_CLOSE_TIME 
        // I tried to test also from time to time that the popup is opened but the setTimeout(time) 
        // doesn't ensure that exacly `time` has passed, it could have passed a little bit more (and that little bit cause
        // inexact test for when the popup is still opened)
        await new Promise(resolve => setTimeout(resolve, DRAG_TO_CREATE_POPUP_CLOSE_TIME));
        await tad.assertWaitable.notExists(tad.screenCapturing.queryByTestId('r9k1_' + timelineTestids.dragToCreatePopup));
        
        // AND still in drag to create mode
        await tad.assertWaitable.isTrue(tad.getObjectViaCheat(Timeline, 'r9k1').state.dragToCreateMode);
        tad.demoForEndUserShow();

        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ openedContextMenuCoordinates: undefined });
        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ dragToCreateMode: false });
    }

    @Scenario("GIVEN drag to create mode, WHEN click on cancel, THEN mode is cancelled")
    async givenDragToCreateModeWhenClickCancel() {
        // GIVEN context menu was opened and 'Drag To Create' was pressed
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.menuButton));
        tad.cc("Click 'Drag To Create' menu entry");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(contextMenuTestIds.menuItem + "_0"));

	    // WHEN
        tad.cc("Click on `Cancel 'drag to create' mode` button from the drag to create popup");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.dragToCreatePopupCancelButton));
        
        // THEN
        await tad.assertWaitable.isFalse(tad.getObjectViaCheat(Timeline, 'r9k1').state.dragToCreateMode, "Check if the drag to create mode is cancelled");
       
        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ openedContextMenuCoordinates: undefined });
        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ dragToCreateMode: false });
    }

    @Scenario("GIVEN drag to create mode, WHEN click and drag, THEN a green selection rectangle appears")
    async givenDragToCreateModeWhenClickAndDrag() {
        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ dragToCreateMode: true });

        await startDragKeepInProgress(3, 100);
        const selector = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.selector);
        const { height } = selector.getBoundingClientRect();
        tad.cc("A green selection rectangle appears on the row");
        await tad.assertWaitable.exists(selector);
        let row = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_4");
        await tad.showSpotlight({ message: "On drag to create mode in progress, when we move the mouse to the other row, selection rectangle stays only on the starting row, the mouse position is on the next row", focusOnLastElementCaptured: true });
        await tad.getObjectViaCheat(Timeline, 'r9k1').dragMove(0, height);
        tad.cc("The height of the section regtagle isn't changed");
        await tad.assertWaitable.equal(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.selector).getBoundingClientRect().height, height);
        row = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_2");
        await tad.showSpotlight({ message: "Move the mouse on previous row", focusOnLastElementCaptured: true });
        await tad.getObjectViaCheat(Timeline, 'r9k1').dragMove(0, -2 * height);
        tad.cc("The height of the section regtagle isn't changed");
        await tad.assertWaitable.equal(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.selector).getBoundingClientRect().height, height);

        tad.getObjectViaCheat(Timeline, 'r9k1')._selectBox.end();
        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ dragToCreateMode: false });
    }

    @Scenario("GIVEN drag to create in progress, WHEN right click, THEN cancel")
    async givenDragToCreateModeInProgressWhenRightClick() {
        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ dragToCreateMode: true });

        let row = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_3");
        tad.cc("The row don't have the segments");
        await tad.assertWaitable.equal(row.children.length, 0);
        await startDragKeepInProgress(3, 100);
        row = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_3");
        await tad.showSpotlight({ message: "We perform the right click", focusOnLastElementCaptured: true });
        tad.getObjectViaCheat(Timeline, 'r9k1').rightClick();
        row = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_3");
        tad.cc("The segment wasn't created, the row don't have the segments");
        await tad.assertWaitable.equal(row.children.length, 0);

        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ dragToCreateMode: false });
    }

    @Scenario("GIVEN drag to create in progress, WHEN mouse up, THEN handler is called")
    async givenDragToCreateModeInProgressWhenMouseUp() {
        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ dragToCreateMode: true });

        await startDragKeepInProgress(3, 100);
        tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_3");
        await tad.showSpotlight({ message: "We perform the mouse up", focusOnLastElementCaptured: true });
        tad.getObjectViaCheat(Timeline, 'r9k1').dragEnd();
        tad.cc("The segment was created");
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.item + "_" + (someTasks.length)));

        tad.getObjectViaCheat(Timeline, 'r9k1').setState({ dragToCreateMode: false });
    }

    @Scenario("WHEN forceDragToCreateMode = true/false, THEN action is not show and segments can/can't be created")
    async whenForceDragToCreateModeTrueFalseThenActionIsNotShownAndSegmentsCanBeCreatedOrNot() {
        // WHEN forceDragToCreate = true
        await tad.cc("WHEN I set forceDragToCreate = true AND I drag to create");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testIds.forceDragToCreateModeTrueRadio));

        // AND WHEN I drag and move
        await startDragKeepInProgress(2, 100);
        tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_2");

        tad.cc("AND I perform");
        const selector = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.selector);
        // THEN
        tad.cc("THEN the drag to create rectangle appears on the row");
        await tad.assertWaitable.exists(selector);
        tad.cc("AND it is green");
        await tad.assertWaitable.include(Array.from(selector.classList), "rct9k-selector-outer-add");

        // AND WHEN I perform mouse up
        await tad.showSpotlight({ message: "AND when I perform the mouse up", focusOnLastElementCaptured: true });
        tad.getObjectViaCheat(Timeline, 'r9k1').dragEnd();
        
        // THEN
        tad.cc("THEN A segment is created");
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.item + "_" + (someTasks.length + 1)));

        // AND 
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.menuButton));
        await tad.assertWaitable.notExists(tad.screenCapturing.queryByTestId(contextMenuTestIds.popup), "AND no 'Drag to create' action is shown");

        // WHEN forceDragToCreate = false 
        await tad.cc("WHEN I set forceDragToCreate = false AND I drag and drop");
        // TODO era uitat await; dar crapa in modul "fast";
        // insa de evitat interactiuni de UI inutile. A simula o actiune omeneasca (e.g. apasare pe buton)
        // este un efort pentru noi. Ne e mult mai simplu sa apelam o functie care sa faca treaba, decat sa simulam
        // actiunea. In cazul asta deci, cred ca era mai bine sa setam acel mod programatic
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testIds.forceDragToCreateModeFalseRadio));

        // THEN segments are not created at drag
        await startDragKeepInProgress(2, 100);
        tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_2");
        tad.getObjectViaCheat(Timeline, 'r9k1').dragEnd();
        await tad.assertWaitable.notExists(tad.screenCapturing.queryByTestId('r9k1_' + timelineTestids.item + "_" + (someTasks.length + 2)));
       
        // AND 
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.menuButton));
        await tad.assertWaitable.notExists(tad.screenCapturing.queryByTestId(contextMenuTestIds.popup), "AND no 'Drag to create' action is shown");
    }
}

async function startDragKeepInProgress(rowNumber: number, x: number, xOffset: number = 10) {
    // we need to get the row after each showSpotlight because on click next step the lastElementCaptured was lost
    let row = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_" + rowNumber);
    await tad.showSpotlight({ message: "We perform click for start the drag", focusOnLastElementCaptured: true });
    tad.getObjectViaCheat(Timeline, 'r9k1').dragStart(row, xOffset);
    row = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.row + "_" + rowNumber);
    await tad.showSpotlight({ message: "We perform mouse move with " + x + "px on X axis", focusOnLastElementCaptured: true });
    await tad.getObjectViaCheat(Timeline, 'r9k1').dragMove(x, 0);
}
