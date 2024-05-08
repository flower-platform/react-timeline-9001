import { createTestids } from '@famiprog-foundation/tests-are-demo';
import { Column, DataCell, Table } from 'fixed-data-table-2';
import { useState } from "react";
import { Dropdown, Form, FormField } from "semantic-ui-react";
import Timeline, { DEFAULT_ROW_CLASS } from '../../../../src/timeline';
import { Item } from '../../../../src/types';
import { d, someHumanResources, someTasks } from "../sampleData";
import { CustomTimeline } from './CustomTimeline';

export default {
    title: "Features/Display item on separate rows if overlap",
    includeStories: /^[A-Z][a-z].*/
}

export const displayItemOnSeparateRowIfOverlapStoryTestIds = createTestids('DisplayItemOnSeparateRowIfOverlapStory', {
    displayItemOnSeparateRowDropdown: ''
});

export const TRUE = "True";
export const FALSE = "False";
export const ONLY_FOR_SELECTED = "Only for selected rows";

export var selectedRow, setSelectedRow;

export const Main = () => {
    const tasks: Item[] = [
        ...someTasks,
        { key: 11, row: 1, title: 'Task AR4', start: d('2018-09-20 10:00'), end: d('2018-09-20 11:00') },
        { key: 12, row: 2, title: 'Task MD6', start: d('2018-09-20 07:30'), end: d('2018-09-20 15:00') }
      ];
    const [displayItemOnSeparateRowIfOverlap, setDisplayItemOnSeparateRowIfOverlap] = useState<boolean | ( (Item, number) => boolean)>(true);  
    [selectedRow, setSelectedRow] = useState<number>(-1);
    const [displayIntervalStart, displayIntervalEnd] = [d('2018-09-20'), d('2018-09-21')] 
    // Smaller segments are staying on top of the bigger ones
    const zIndexFunction = (item: Item) => {
        return Math.floor((displayIntervalEnd - displayIntervalStart) /  ((item.end.valueOf() as number) - (item.start.valueOf() as number))); 
    }

    var displayItemOnSeparateRowOnlyForSelectedRow = () => {
        return (item, rowIndex) => {
            if (rowIndex == (selectedRow)) {
                return true;
            } else {
                return false;
            }
        }
    }
    const onRowClick = (event, rowIndex) => {
        setSelectedRow(Number(rowIndex));
        if (typeof displayItemOnSeparateRowIfOverlap === 'function') {
            setDisplayItemOnSeparateRowIfOverlap(() => displayItemOnSeparateRowOnlyForSelectedRow());
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
                                setDisplayItemOnSeparateRowIfOverlap(value == 'onlyForSelectedRow' ? () => displayItemOnSeparateRowOnlyForSelectedRow() : value === 'true');
                            }} 
                            value={typeof displayItemOnSeparateRowIfOverlap === 'function' ? 'onlyForSelectedRow' : displayItemOnSeparateRowIfOverlap + ''} 
                            data-testid={displayItemOnSeparateRowIfOverlapStoryTestIds.displayItemOnSeparateRowDropdown}
                        />
                    </FormField>
                </Form>
            </div>
            <CustomTimeline startDate={displayIntervalStart} endDate={displayIntervalEnd} groups={someHumanResources} items={tasks}
                itemRendererDefaultProps={{color: "rgba(55,145,212,0.6)"}}
                displayItemOnSeparateRowIfOverlap={displayItemOnSeparateRowIfOverlap}
                selectedIndex={selectedRow}
                zIndexFunction={zIndexFunction}
                onRowClick={onRowClick}
                table={<Table width={100} onRowClick={onRowClick}
                            rowClassNameGetter={(rowIndex) => rowIndex == selectedRow ? DEFAULT_ROW_CLASS + " selected-row" : undefined}>
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