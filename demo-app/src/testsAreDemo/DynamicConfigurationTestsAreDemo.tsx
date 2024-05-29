import { Only, Scenario, ScenarioOptions, render, tad } from "@famiprog-foundation/tests-are-demo";
import { Main, testIds } from "../stories/dynamicConfiguration/DynamicConfiguration.stories";
import { timebarTestIds } from "@famiprog-foundation/react-gantt";

/**
 * @author Daniela Buzatu
 */
export class DynamicConfigurationTestsAreDemo {
    async before() {
        render(<Main/>);
    }

    @Scenario("WHEN I change the startDate/endDate properties THEN the new interval is displayed")
    async whenStartEndDateChanges() {
        // WHEN I change the start/end date properties by clicking the "Change display interval" button
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testIds.changeDisplayIntervalButton));
        
        // THEN the new interval is displayed
        const timebarBottom = tad.screenCapturing.getByTestId('r9k1_' + timebarTestIds.timebarInnerBottom);
        await tad.assertWaitable.oneOf(tad.withinCapturing(timebarBottom).getByTestId('r9k1_' + timebarTestIds.timebarItem + "_" + 0).textContent, ["01", "01:00"]);
        await tad.assertWaitable.oneOf(tad.withinCapturing(timebarBottom).getByTestId('r9k1_' + timebarTestIds.timebarItem + "_" + 23).textContent, ["00", "00:00"]);
    }
}