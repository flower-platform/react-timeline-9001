import { Column, DataCell, Table } from 'fixed-data-table-2';
import { useState } from "react";
import { Button } from "semantic-ui-react";
import Timeline from '../../../../src/timeline';
import { Item } from '../../../../src/types';
import { d, someHumanResources, someTasks } from "../sampleData";

export default {
    title: "Features/Allow Overlapping Segments"
}

export const Main = () => {
    const tasks: Item[] = [
        ...someTasks,
        { key: 11, row: 1, title: 'Task AR4', start: d('2018-09-20 10:00'), end: d('2018-09-20 11:00') },
        { key: 12, row: 2, title: 'Task MD6', start: d('2018-09-20 07:30'), end: d('2018-09-20 15:00') }
      ];
    const [allowOverlappingSegments, setAllowOverlappingSegments] = useState<boolean>(false); 
    const [displayIntervalStart, displayIntervalEnd] = [d('2018-09-20'), d('2018-09-21')] 
    // Smaller segments are staying on top of the bigger ones
    const zIndexFunction = (item: Item) => {
        return Math.floor((displayIntervalEnd - displayIntervalStart) /  ((item.end.valueOf() as number) - (item.start.valueOf() as number))); 
    }
    return (
        <>
            <div>
                <Button style={{display: "inline"}} toggle active={allowOverlappingSegments} onClick={() => setAllowOverlappingSegments(!allowOverlappingSegments)}>
                        Allow ovelapping segments
                </Button>
            </div>
            <Timeline startDate={displayIntervalStart} endDate={displayIntervalEnd} groups={someHumanResources} items={tasks}
                itemRendererDefaultProps={{color: "rgba(55,145,212,0.6)"}}
                allowOverlappingSegments={allowOverlappingSegments}
                zIndexFunction={zIndexFunction}
                table={<Table width={100} >
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