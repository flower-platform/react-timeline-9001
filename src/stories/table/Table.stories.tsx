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

export const OverridingDefaultColumnRenderers: ComponentStory<typeof Timeline> = () => {
    /**
    * Need to extend the the @GroupRenderer in order to have acces to group property
    */
    class TitleColumnCellRenderer extends GroupRenderer {
        render() {
            return <DataCell style={emphasizeStyle}>{this.props.group ? this.props.group.title : ""}</DataCell>;
        }
    }

    class TitleColumnHeaderRenderer extends React.Component {
        render() {
            return <DataCell style={emphasizeStyle}>Name</DataCell>;
        }
    }
    return <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={[...manyHumanResources]} items={[...manyTasks]}
        groupRenderer={TitleColumnCellRenderer} groupTitleRenderer={TitleColumnHeaderRenderer} />
}

OverridingDefaultColumnRenderers.parameters = {
    scenarios: [tableScenarios.propertyGroupRenderer, tableScenarios.propertyGroupTitleRenderer]
};

export const ProvidingColumnsDescriptors: ComponentStory<typeof Timeline> = () => {
    /**
     * Need to extend the the @GroupRenderer in order to have acces to group property
     * 'GroupRenderer' contains additional check for any empty rows added in for filling in the empty space at the bottom of the table
     */
    class JobColumnCellRenderer extends GroupRenderer {
        render() {
            return <span>{this.props.group ? this.props.group.job : "" }</span>;
        }
    }

    class JobColumnHeaderRenderer extends React.Component {
        render() {
            return <span>Description</span>;
        }
    }

    const tableColumns = [
        // default renderers
        {
            width: 100,
            headerLabel: 'Title',
            labelProperty: 'title'
        },
        // custom renderers: react elements
        {
            width: 150,
            cellRenderer: <DataCell><Checkbox> Checkbox </Checkbox></DataCell>,
            headerRenderer: (
                <span>
                    <Icon type="check-circle" /> <span>Custom check</span>
                </span>
            )
        },
        // custom renderers: class component
        {
            width: 100,
            headerRenderer: JobColumnHeaderRenderer,
            cellRenderer: JobColumnCellRenderer
        }
    ];
    return (

        <><Alert message={<>
            The "Title" column descriptor doesn't have any custom  <code>headerRenderer</code> or <code>cellRenderer</code>.
            In this case the default column renderers are used.
        </>} /><Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={[...manyHumanResources]} items={[...manyTasks]} tableColumns={tableColumns} />
        </>
    );
}

ProvidingColumnsDescriptors.parameters = {
    scenarios: [tableScenarios.propertyColumns, tableScenarios.propertyColumnsCellRenderer,
    tableScenarios.propertyColumnsHeaderLabel, tableScenarios.propertyColumnsHeaderRenderer,
    tableScenarios.propertyColumnsLabelProperty, tableScenarios.propertyColumnsWidth]
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
            // TODO DB: remove this when fix the item renderer default properties problem
            itemRenderer={ItemRenderer}
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
                                width={50}
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

