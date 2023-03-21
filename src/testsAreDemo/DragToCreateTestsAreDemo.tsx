import React from "react";
import { render, Scenario, ScenarioOptions, tad } from "@famiprog-foundation/tests-are-demo";
import { DragToCreateDemo } from "../stories/dragToCreate/DragToCreate.stories";
import { timelineTestids } from "../timeline";
import { Timeline } from "antd";

export class DragToCreateTestsAreDemo {

    async before() {
        render(<DragToCreateDemo />);
    }

    @ScenarioOptions({ linkWithNextScenario: true })
    @Scenario("WHEN click on the menu button, THEN the menu opens")
    async whenClickMenuButton() {
        tad.cc("Click on the menu button");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(timelineTestids.menuButton));
        tad.cc("Check if the menu is open");
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId(timelineTestids.menu));
        tad.cc("Check if exist the 'Add (drag to create)' button");
        await tad.assertWaitable.equal(tad.screenCapturing.getByTestId(timelineTestids.dragToCreateButton).textContent, "Add (drag to create)");
    }

    @Scenario("WHEN click on the 'Add (drag to create)' menu entry, THEN the Gantt goes into the 'drag to create mode'")
    async whenClickAddMenuEntry() {
        let button = tad.screenCapturing.getByTestId(timelineTestids.dragToCreateButton);
        tad.cc("Check if button is positive");
        await tad.assertWaitable.include(button.className, "positive");
        tad.cc("Check if the content of button is 'Add (drag to create)'");
        await tad.assertWaitable.include(button.textContent, "Add (drag to create)");
        tad.cc("Click for drag to create mode")
        await tad.userEventWaitable.click(button);

        tad.cc("Check if is the drag to create mode");
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId(timelineTestids.dragToCreatePopup));
        const popup = tad.screenCapturing.getByTestId(timelineTestids.dragToCreatePopup);
        tad.cc("Check if the popup is open");
        await tad.assertWaitable.exists(popup);
        tad.cc("Check if the mesage of popup is 'Drag to create mode'");
        tad.assertWaitable.equal(popup.querySelector("div").querySelector("div").textContent, "Drag to create mode");
        const cancelButton = tad.screenCapturing.getByTestId(timelineTestids.dragToCreateCancelButton);
        tad.cc("Check if exista 'Cance' button");
        await tad.assertWaitable.exists(cancelButton);
        tad.cc("Check if the cancel buton is negative");
        await tad.assertWaitable.include(cancelButton.className, "negative");


        tad.cc("Click on the menu button");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(timelineTestids.menuButton));
        button = tad.screenCapturing.getByTestId(timelineTestids.dragToCreateButton);
        tad.cc("Check if exist the 'Cancel: Add (drag to create)' button");
        await tad.assertWaitable.equal(button.textContent, "Cancel: Add (drag to create)");
        tad.cc("Check if button is negative");
        await tad.assertWaitable.include(button.className, "negative");
        tad.cc("Check if button has the cancel icon");
        tad.assertWaitable.equal(button.querySelector("i").className, "cancel icon")

        // butonul Add ... nu mai exista; e inlocuit cu Cancel: Add (drag to create), care e rosu si are iconita de x
        // apare un popup (pozitionat in sus) cu un mesaj, si cu butonl de cancel
    }

    @Scenario("GIVEN drag to create mode, WHEN click on cancel (from the menu), THEN mode is cancelled")
    async givenDragToCreateModeWhenClickCancelFromMenu() {
    }

    @Scenario("GIVEN drag to create mode, WHEN click on cancel (from the popup), THEN mode is cancelled")
    async givenDragToCreateModeWhenClickCancelFromPopup() {
    }

    @Scenario("GIVEN drag to create mode, WHEN click and drag, THEN a green selection rectangle appears")
    async givenDragToCreateModeWhenClickAndDrag() {
        //"mutam" mouse-ul sub randul curent: chenarul nu se mareste (precum face in modul de selectie)
        // idem si un sus
    }

    @Scenario("GIVEN drag to create in progress, WHEN right click, THEN cancel")
    async givenDragToCreateModeInProgressWhenRightClick() {
    }

    @Scenario("GIVEN drag to create in progress, WHEN mouse up, THEN handler is called")
    async givenDragToCreateModeInProgressWhenMouseUp() {
        // si la noi in storybook se va intampla creerea de segment; putem verifica cu "get by testid" acest segment
    }
}