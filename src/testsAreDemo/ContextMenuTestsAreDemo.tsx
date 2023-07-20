import { Only, Scenario, ScenarioOptions, render, tad } from "@famiprog-foundation/tests-are-demo";
import { contextMenuTestIds } from "../components/ContextMenu/ContextMenu";
import { ContextMenu, addTaskActionIcon, addTaskActionLabel, contextMenuStoryTestIds, deleteActionLabel, editActionLabel } from "../stories/contextMenuAndSelection/ContextMenuAndSelection.stories";
import { someHumanResources } from "../stories/sampleData";
import { timelineTestids as testids } from "../timeline";

export class ContextMenuTestsAreDemo {

    async before() {
        render(<ContextMenu />);
    }

    @Only()
    @Scenario("WHEN I right click on a row, THEN a context menu with two actions opens (one with custom renderer)")
    @ScenarioOptions({ linkWithNextScenario: true })
    async whenRightClickOnARow() {
        // WHEN right click on a row
        const firstRow = tad.screenCapturing.getByTestId(testids.row + "_0");
        const clickPosition = { clientX: Math.round(firstRow.getBoundingClientRect().x) + 30, clientY: Math.round(firstRow.getBoundingClientRect().y) + 30 };
        await tad.fireEventWaitable.contextMenu(firstRow, clickPosition);

        // THEN CM is opened at the clicked position
        tad.demoForEndUserHide();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        await tad.assertWaitable.exists(popup);
        await this.isPopupPositionedNearPoint(popup.getBoundingClientRect(), { x: clickPosition.clientX, y: clickPosition.clientY });
        tad.demoForEndUserShow();

        // AND it has: 'Add' and 'Change segments height' actions
        let menuEntry = tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_0");
        tad.cc("The context menu contains an 'Add' action");
        await tad.assertWaitable.equal(menuEntry.textContent, addTaskActionLabel + someHumanResources[0].title);
        tad.demoForEndUserHideNext()
        await tad.assertWaitable.include(menuEntry.querySelector("i").className, addTaskActionIcon);
        // This is a custom action
        tad.cc("And a global action for changing the segments height (with custom radio buttons renderer)");
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId(contextMenuStoryTestIds.customRendererRadioSmall));
        tad.demoForEndUserHide();
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId(contextMenuStoryTestIds.customRendererRadioMedium));
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId(contextMenuStoryTestIds.customRendererRadioLarge));
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN I right click on a segment, THEN a context menu with 3 actions is shown")
    @ScenarioOptions({ linkWithNextScenario: true })
    async whenRightClickOnASegment() {
        const segment = tad.screenCapturing.getByTestId(testids.item + "_0");
        const segmentBoundingRect = segment.getBoundingClientRect();

        // WHEN right click on a segment
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_0"), { clientX: segmentBoundingRect.x + segmentBoundingRect.width / 2, clientY: segmentBoundingRect.y + segmentBoundingRect.height / 2 });

        // THEN the CM opens
        tad.demoForEndUserHideNext();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        await tad.assertWaitable.exists(popup);

        // AND it has: 'Edit', 'Delete' and 'Change segments height' actions
        tad.cc("The context menu contains an 'Edit' action");
        await tad.assertWaitable.equal(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_0").textContent, editActionLabel);
        tad.cc("And a 'Delete' action");
        await tad.assertWaitable.equal(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_1").textContent, deleteActionLabel);
        tad.cc("And a global action for changing the segments height");
        await tad.assertWaitable.exists(tad.withinCapturing(tad.screenCapturing.getByTestId(contextMenuTestIds.menuItem + "_2")).getByTestId(contextMenuStoryTestIds.customRendererRadioSmall));
    }

    @Scenario("WHEN I CTRL + right click on another segment, THEN a context menu with 2 actions is shown")
    @ScenarioOptions({ linkWithNextScenario: true })
    async whenCTRLRightClickOnAnotherSegment() {
        const segment = tad.screenCapturing.getByTestId(testids.item + "_3");
        const segmentBoundingRect = segment.getBoundingClientRect();
        tad.cc("WHEN I CTRL + right click another segment");
        await tad.fireEventWaitable.contextMenu(segment, { ctrlKey: true, clientX: segmentBoundingRect.x + segmentBoundingRect.width / 2, clientY: segmentBoundingRect.y + segmentBoundingRect.height / 2 });

        // THEN the CM opens
        tad.demoForEndUserHideNext();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        await tad.assertWaitable.exists(popup);

        // AND it has: 'Delete' and 'Change segments height' actions
        tad.cc("The context menu contains a 'Delete' action");
        await tad.assertWaitable.equal(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_0").textContent, deleteActionLabel);
        tad.cc("And a global action for changing the segments height");
        await tad.assertWaitable.exists(tad.withinCapturing(tad.screenCapturing.getByTestId(contextMenuTestIds.menuItem + "_1")).getByTestId(contextMenuStoryTestIds.customRendererRadioSmall));
    }

    @Scenario("WHEN I click on an action, THEN the action is run (w/ or w/o closing the menu)")
    @ScenarioOptions({ linkWithNextScenario: true })
    async whenClickAnAction() {
        // WHEN I click on action 2 on its custom "large" radio button 
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(contextMenuStoryTestIds.customRendererRadioLarge));

        // THEN the segments becomes larger
        let row = tad.screenCapturing.getByTestId(testids.row + "_0");
        // Needed Math.round() => because on large dpi (175%) the height has some additional decimals: e.g.: 50.000003814697266
        tad.cc("Segments became larger");
        await tad.assertWaitable.equal(Math.round(tad.withinCapturing(row).getByTestId(testids.item + "_0").getBoundingClientRect().height), 50);

        // AND the CM doesn't close
        tad.demoForEndUserHideNext();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        await tad.assertWaitable.exists(popup);

        // WHEN I click on "Delete"
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_0"));

        // THEN the two segments are deleted
        tad.cc("Selected segments were deleted");
        await tad.assertWaitable.notExists(tad.screenCapturing.queryByTestId(testids.item + "_0"));
        tad.demoForEndUserHideNext();
        await tad.assertWaitable.notExists(tad.screenCapturing.queryByTestId(testids.item + "_3"));

        // AND CM is closed
        tad.demoForEndUserHideNext();
        await tad.assertWaitable.notExists(tad.screenCapturing.queryByTestId(contextMenuTestIds.popup));
    }

    @Scenario("WHEN I click the hamburger button, THEN the context menu is shown besides that button")
    async whenClickTheHamburgerButton() {
        // GIVEN I select one segment
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_1"));

        // WHEN
        const menuButton = tad.screenCapturing.getByTestId(testids.menuButton);
        tad.cc("Click on the menu button");
        await tad.userEventWaitable.click(menuButton);

        // THEN the context menu is opened and positioned near the center of the hamburger button");
        tad.demoForEndUserHide();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        await tad.assertWaitable.exists(popup);
        const menuButtonCenter = { x: menuButton.getBoundingClientRect().x + menuButton.getBoundingClientRect().width / 2, y: menuButton.getBoundingClientRect().y + menuButton.getBoundingClientRect().height / 2 };
        await this.isPopupPositionedNearPoint(popup.getBoundingClientRect(), menuButtonCenter);
        tad.demoForEndUserShow();

        // AND it has: 'Edit', 'Delete' and 'Change segments height' actions
        tad.cc("The context menu contains an 'Edit' action");
        await tad.assertWaitable.equal(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_0").textContent, editActionLabel);
        tad.cc("And a 'Delete' action");
        await tad.assertWaitable.equal(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_1").textContent, deleteActionLabel);
        tad.cc("And a global action for changing the segments height");
        await tad.assertWaitable.exists(tad.withinCapturing(tad.screenCapturing.getByTestId(contextMenuTestIds.menuItem + "_2")).getByTestId(contextMenuStoryTestIds.customRendererRadioSmall));
    }

    async isPopupPositionedNearPoint({ x: popupX, y: popupY, width: popupWidth, height: popupHeight }, { x, y }) {
        const popupEndX = Math.round(popupX + popupWidth);
        const popupEndY = Math.round(popupY + popupHeight);
        popupX = Math.floor(popupX);
        popupY = Math.round(popupY);

        // We didn't understood why it is a difference of some decimals (maximum 1 px) between the expected position and the actual position. 
        // These difference in decimals is not the same every time, is variable regarding the dimension of the window and the dpi of the screen
        // So the only thing in common is that the actual value is near the expected one at a maximum 1 px distance (below or above)
        await tad.assertWaitable.include([popupX - 1, popupX, popupX + 1, popupEndX - 1, popupEndX, popupEndX + 1], Math.round(x));
        // semantic ui popup is displayed 10 px below or 10 px above the mouse position
        await tad.assertWaitable.include([popupY - 11, popupY - 10, popupY - 9, popupEndY + 9, popupEndY + 10, popupEndY + 11], Math.round(y));
    }
}