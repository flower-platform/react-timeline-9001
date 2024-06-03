import React from 'react';
import { timelineScenarios } from '../TimelineScenarios';
import { d, someHumanResources, someTasks } from '../sampleData';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import Timeline from '../../../../src/timeline';
import SplitPane from 'react-split-pane';

export default {
    title: 'Features/Zoom'
};

export const Main = () => {

    return (
        <SplitPane defaultSize={"50%"}>
            <Timeline componentId='1' startDate={d('2018-09-20 00:00:00')} endDate={d('2018-09-21 23:59:59')} groups={someHumanResources} items={someTasks} showZommShortcuts={true}
                table={<Table width={100} >
                    <Column
                        columnKey="title"
                        width={100}
                        header={<DataCell>Title</DataCell>}
                        cell={({ rowIndex }) => <DataCell>{rowIndex < someHumanResources.length ? someHumanResources[rowIndex].title : ""}</DataCell>} />
                </Table>}
            />
            <Timeline componentId='2' startDate={d('2018-09-20 00:00:00')} endDate={d('2018-09-21 23:59:59')} groups={someHumanResources} items={someTasks} showZommShortcuts={true}
                table={<Table width={100} >
                    <Column
                        columnKey="title"
                        width={100}
                        header={<DataCell>Title</DataCell>}
                        cell={({ rowIndex }) => <DataCell>{rowIndex < someHumanResources.length ? someHumanResources[rowIndex].title : ""}</DataCell>} />
                </Table>}
            />
        </SplitPane>
    );
};

Main.parameters = {
    scenarios: [
        timelineScenarios.propertyShowZoomShortcuts,
    ]
};
