import { createTestids } from '@famiprog-foundation/tests-are-demo';
import { Column, DataCell, Table } from 'fixed-data-table-2';
import { useState } from "react";
import { Dropdown, Form, FormField } from "semantic-ui-react";
import Timeline from '../../../../src/timeline';
import { Item } from '../../../../src/types';
import { d, someHumanResources, someTasks } from "../sampleData";

export default {
    title: "Features/Display item on separate rows if overlap",
    includeStories: /^[A-Z]/
}

export const displayItemOnSeparateRowsIfOverlapStoryTestIds = createTestids('DisplayItemOnSeparateRowsIfOverlapStory', {
    displayItemOnSeparateRowDropdown: ''
});

export const TRUE = "True";
export const FALSE = "False";
export const ONLY_FOR_SELECTED = "Only for selected rows";

export const Main = () => {
    const tasks: Item[] = [
        ...someTasks,
        { key: 11, row: 1, title: 'Task AR4', start: d('2018-09-20 10:00'), end: d('2018-09-20 11:00') },
        { key: 12, row: 2, title: 'Task MD6', start: d('2018-09-20 07:30'), end: d('2018-09-20 15:00') }
      ];
    const [displayItemOnSeparateRowsIfOverlap, setDisplayItemOnSeparateRowsIfOverlap] = useState<boolean | ( (Item) => boolean)>(true); 
    const [selectedRow, setSelectedRow] = useState<number>(1); 
    const [displayIntervalStart, displayIntervalEnd] = [d('2018-09-20'), d('2018-09-21')] 
    // Smaller segments are staying on top of the bigger ones
    const zIndexFunction = (item: Item) => {
        return Math.floor((displayIntervalEnd - displayIntervalStart) /  ((item.end.valueOf() as number) - (item.start.valueOf() as number))); 
    }

    var displayItemOnSeparateRowsOnlyForSelectedRow = (rowIndex) => {
        return (item) => {
            if (item.row == (rowIndex == undefined ? selectedRow : rowIndex)) {
                return true;
            } else {
                return false;
            }
        }

    }
    const onTableRowClick = (event, rowIndex, rowData) => {
        setSelectedRow(rowIndex);
        // TODO force reset for the gantt to ask again displayItemOnSeparateRowsIfOverlap function 
        if (typeof displayItemOnSeparateRowsIfOverlap === 'function') {
            // setdisplayItemOnSeparateRowsIfOverlap(true);
            setDisplayItemOnSeparateRowsIfOverlap(() => displayItemOnSeparateRowsOnlyForSelectedRow(rowIndex));
        }
    }

    return (
        <>
            <div>
                <Form>
                    <FormField>
                        <label>Display item on separate rows if overlap:</label>
                        <Dropdown
                            fluid
                            selection
                            options={[
                                { key: 'true', text: TRUE, value: 'true' },
                                { key: 'false', text: FALSE, value: 'false' },
                                { key: 'onlyForSelectedRow', text: ONLY_FOR_SELECTED, value: 'onlyForSelectedRow' },
                            ]}
                            onChange={(e, {value}) => {
                                setDisplayItemOnSeparateRowsIfOverlap(value == 'onlyForSelectedRow' ? () => displayItemOnSeparateRowsOnlyForSelectedRow(selectedRow) : value === 'true');
                            }} 
                            value={typeof displayItemOnSeparateRowsIfOverlap === 'function' ? 'onlyForSelectedRow' : displayItemOnSeparateRowsIfOverlap + ''} 
                            data-testid={displayItemOnSeparateRowsIfOverlapStoryTestIds.displayItemOnSeparateRowDropdown}
                        />
                    </FormField>
                </Form>
            </div>
            <Timeline startDate={displayIntervalStart} endDate={displayIntervalEnd} groups={someHumanResources} items={tasks}
                itemRendererDefaultProps={{color: "rgba(55,145,212,0.6)"}}
                displayItemOnSeparateRowsIfOverlap={displayItemOnSeparateRowsIfOverlap}
                zIndexFunction={zIndexFunction}
                table={<Table width={100} onRowClick={onTableRowClick}>
                            <Column
                                columnKey="title"
                                width={100}
                                header={<DataCell>Title</DataCell>}
                                cell={({rowIndex}) => <DataCell>{rowIndex < someHumanResources.length ? someHumanResources[rowIndex].title : ""}</DataCell>}/>
                        </Table>}
            />
        </>
    );
  };