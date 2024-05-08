import { Table, Column, DataCell} from 'fixed-data-table-2';
import { d, someHumanResources, someTasks } from "../sampleData";
import { Timeline } from '@famiprog-foundation/react-gantt'
import { Button } from 'semantic-ui-react';
import { useState } from 'react';
import moment from 'moment';
import { createTestids } from '@famiprog-foundation/tests-are-demo';

export default {
    title: 'Features/Dynamic Configuration',
    includeStories: /^[A-Z]/
};

export const testIds = createTestids('DynamicConfigurationStory', {
    changeDisplayIntervalButton: ''
});

export const Main = () => {
    const [hoursAddition, setHoursAddition] = useState<number>(0);
    return <>
            <div>
                <Button primary data-testid={testIds.changeDisplayIntervalButton} onClick={() => setHoursAddition(hoursAddition + 1)}>
                    Change display interval: + 1 hour
                </Button>
            </div>
            <Timeline 
                startDate={moment('2018-09-20').clone().add(hoursAddition, 'hours').valueOf()} 
                endDate={moment('2018-09-21').clone().add(hoursAddition, 'hours').valueOf()}
                groups={someHumanResources} items={someTasks}
                table={<Table width={100} >
                            <Column
                                columnKey="title"
                                width={100}
                                header={<DataCell>Title</DataCell>}
                                cell={({rowIndex}) => <DataCell>{rowIndex < someHumanResources.length ? someHumanResources[rowIndex].title : ""}</DataCell>}/>
                        </Table>}>
            </Timeline>
        </>
}