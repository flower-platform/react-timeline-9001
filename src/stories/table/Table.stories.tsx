import { ComponentStory } from "@storybook/react";
import { useState } from "react";
import { Checkbox, Icon } from "semantic-ui-react";
import { Timeline } from "../..";
import { d, manyHumanResources, someTasks } from "../sampleData";

import { Column, DataCell, Table } from "fixed-data-table-2";
import { GanttDataCell } from "../../components/GanttDataCell";
import { DEMO_TABLE_WIDTH, tableScenarios, tableTestIds } from "./TableScenarios";
import { Alert } from "antd";
export default {
    title: 'Features/Table',
    component: Timeline
};

export const GanttWithoutTable: ComponentStory<typeof Timeline> = () => {

    return (
        <>
            <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={manyHumanResources} items={someTasks}/>
        </>
    );
}

GanttWithoutTable.parameters = {
    scenarios: [tableScenarios.propertyTable]
}

var emphasizeStyle = { color: 'red' };

const headerStyle = {
    color: '#000',
    fontSize: '12px',
    lineHeight: '1',
    background: '#CCFFEE',
    border: 'none'
};

export const ProvidingCustomTable: ComponentStory<typeof Timeline> = () => {
    const [tableWidth, setTableWidth] = useState<number>(DEMO_TABLE_WIDTH);
    return (
        <>
            <Alert message={<span> Table width: {tableWidth} </span>}/>
            <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={manyHumanResources} items={someTasks}
                onTableResize={(size) => {setTableWidth(size); console.log("!!!!! " + size)}}
                table={<Table 
                            rowHeight={50}
                            width={tableWidth}
                            isColumnResizing={true}
                            rowAttributesGetter={index => {return { "data-testid": tableTestIds.row + "_" + index}} }
                            >
                            <Column
                                key={0}
                                columnKey={0}
                                width={100}
                                header={<DataCell style={headerStyle}>Title</DataCell>}
                                cell={({rowIndex}) => <GanttDataCell rowIndex={rowIndex} content={() => manyHumanResources[rowIndex].title}/>}
                            />
                            <Column
                                key={1}
                                columnKey={1}
                                width={60}
                                header={<DataCell style={headerStyle}><Icon type="check-circle" /> <span>Custom check</span></DataCell>}
                                cell={({rowIndex}) => <GanttDataCell rowIndex={rowIndex} content={() => <Checkbox/>}/>}
                            />
                            <Column
                                key={2}
                                columnKey={2}
                                flexGrow={1}
                                width={100}
                                header={<DataCell style={headerStyle}>Job</DataCell>}
                                cell={({rowIndex}) => <GanttDataCell rowIndex={rowIndex} content={() => manyHumanResources[rowIndex].job}/>}
                            />
                        </Table>} 
            />
        </>
    );
}

ProvidingCustomTable.parameters = {
    scenarios: [...Object.keys(tableScenarios).map(key => tableScenarios[key])]
}

