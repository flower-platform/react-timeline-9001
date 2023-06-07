import { ComponentStory } from "@storybook/react";
import React, { Fragment, createRef } from "react";
import { Checkbox, Icon } from "semantic-ui-react";
import { GroupRenderer, ItemRenderer, Timeline } from "../..";
import { d, manyHumanResources, manyTasks } from "../sampleData";

import { Alert } from "antd";
import { Column, Table, DataCell } from "fixed-data-table-2";
import { DEMO_TABLE_WIDTH, tableScenarios, tableTestIds } from "./TableScenarios";
export default {
    title: 'Features/Table',
    component: Timeline
};

var emphasizeStyle = { color: 'red' };

const headerStyle = {
    color: '#000',
    fontSize: '12px',
    lineHeight: '1',
    background: '#CCFFEE',
    border: 'none'
};

export const ProvidingCustomTable: ComponentStory<typeof Timeline> = () => {
    class TitleCellRenderer extends GroupRenderer {
        render() {
            // Additional check for any empty rows added in for filling in the empty space at the bottom of the table
            return <DataCell>{this.props.rowIndex < manyHumanResources.length ? manyHumanResources[this.props.rowIndex].title : ""}</DataCell>;
        }
    }

    class JobCellRenderer extends GroupRenderer {
        render() {
            return <DataCell>{this.props.rowIndex < manyHumanResources.length ? manyHumanResources[this.props.rowIndex].job : ""}</DataCell>;
        }
    }

    class CheckBoxCellRenderer extends GroupRenderer {
        render() {
            return (this.props.rowIndex < manyHumanResources.length) ? (<DataCell><Checkbox> Checkbox </Checkbox></DataCell>) : <Fragment/>;
        }
    }

    return (
        <Fragment>
            <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={manyHumanResources} items={manyTasks}
                table={<Table 
                            rowHeight={50}
                            width={DEMO_TABLE_WIDTH}
                            isColumnResizing={true}
                            rowAttributesGetter={index => {return { "data-testid": tableTestIds.row + "_" + index}} }
                            >
                            <Column
                                key={0}
                                columnKey={0}
                                width={100}
                                header={<DataCell style={headerStyle}>Title</DataCell>}
                                cell={<TitleCellRenderer />}
                            />
                            <Column
                                key={1}
                                columnKey={1}
                                width={60}
                                header={<DataCell style={headerStyle}><Icon type="check-circle" /> <span>Custom check</span></DataCell>}
                                cell={<CheckBoxCellRenderer/>}
                            />
                            <Column
                                key={2}
                                columnKey={2}
                                width={100}
                                header={<DataCell style={headerStyle}>Job</DataCell>}
                                cell={<JobCellRenderer></JobCellRenderer>}
                            />
                        </Table>} 
            />
        </Fragment>
    );
}

ProvidingCustomTable.parameters = {
    scenarios: [tableScenarios.propertyTable]
}

