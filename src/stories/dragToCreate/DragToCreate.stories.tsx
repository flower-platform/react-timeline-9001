import React from 'react';
import Timeline from '../../timeline';
import { d, someHumanResources, someTasks } from '../sampleData';
import { ComponentStory } from '@storybook/react';
import { dragToCreateScenarios } from './DragToCreateScenarios';
import { DragToCreateParam } from '../../types';
import { Table, Column, DataCell} from 'fixed-data-table-2';

export default {
    title: 'Features/Drag to create',
    component: Timeline
};

export const Main: ComponentStory<typeof Timeline> = () => {
    class DragToCreateDemo extends React.Component {
        someTasks = [...someTasks];
        groups = [...someHumanResources, { id: 4, title: 'Andy' }];
        render() {
            return <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={this.groups} items={this.someTasks}
                table={<Table width={100}>
                            <Column
                                columnKey="title"
                                width={100}
                                header={<DataCell>Title</DataCell>}
                                cell={({rowIndex}) => <DataCell>{rowIndex < someHumanResources.length ? someHumanResources[rowIndex].title : ""}</DataCell>}/>
                        </Table>}
                onDragToCreateEnded={(param: DragToCreateParam) => {
                    if (this.groups[param.groupIndex]) {
                        const task = {
                            key: param.itemIndex,
                            row: param.groupIndex, title: 'Task ' + this.groups[param.groupIndex].title + param.itemIndex,
                            start: param.itemStart,
                            end: param.itemEnd || param.itemStart
                        }
                        this.someTasks.push(task);
                        this.forceUpdate();
                    }
                }} />
        }
    }
    return <DragToCreateDemo />;

};

Main.parameters = {
    scenarios: Object.keys(dragToCreateScenarios).map(key => dragToCreateScenarios[key])
};
