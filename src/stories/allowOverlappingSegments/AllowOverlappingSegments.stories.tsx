import { Column, DataCell, Table } from 'fixed-data-table-2';
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { Item, Timeline } from "../..";
import { d, someHumanResources, someTasks } from "../sampleData";

export default {
    title: "Features/Allow Overlapping Segments"
}

export const Main = () => {
    const tasks: Item[] = [
        ...someTasks,
        { key: 11, row: 1, title: 'Task AR4', start: d('2018-09-20 10:00'), end: d('2018-09-20 12:00') },
        { key: 12, row: 2, title: 'Task MD6', start: d('2018-09-20 09:00'), end: d('2018-09-20 15:00') }
      ];
    const [allowOverlappingSegments, setAllowOverlappingSegments] = useState<boolean>(false);  
    
    return (
        <>
            <div>
                <Button style={{display: "inline"}} toggle active={allowOverlappingSegments} onClick={() => setAllowOverlappingSegments(!allowOverlappingSegments)}>
                        Allow ovelapping segments
                </Button>
            </div>
            <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={someHumanResources} items={tasks}
                itemRendererDefaultProps={{color: "rgba(55,145,212,0.6)"}}
                allowOverlappingSegments={allowOverlappingSegments}
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