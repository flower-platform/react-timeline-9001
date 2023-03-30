import React from 'react';
import Timeline from '../../timeline';
import { d, someHumanResources, someTasks } from '../sampleData';
import { ComponentStory } from '@storybook/react';
import { dragToCreateScenarios } from './DragToCreateScenarios';
import { DragToCreateParam } from '../../types';

export default {
    title: 'Features/Drag to create',
    excludeStories: ["DragToCreateDemo"],
    component: Timeline
};

export const Main: ComponentStory<typeof Timeline> = () => {
    return <DragToCreateDemo />;

};

Main.parameters = {
    scenarios: Object.keys(dragToCreateScenarios).map(key => dragToCreateScenarios[key])
};

export class DragToCreateDemo extends React.Component {
    someTasks = [...someTasks];
    groups = [...someHumanResources, { id: 4, title: 'Andy' }];
    render() {
        return <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={this.groups} items={this.someTasks} onDragToCreateEnded={(param: DragToCreateParam) => {
            if (this.groups[param.groupIndex]) {
                this.someTasks.push({ key: param.itemIndex, row: param.groupIndex, title: 'Task ' + this.groups[param.groupIndex].title + param.itemIndex, start: param.itemStart, end: param.itemEnd || param.itemStart });
                this.forceUpdate();
            }
            console.log(param)

        }
        } onDragToCreateStarted={(param: DragToCreateParam) => {
            console.log(param)

        }} />
    }
}
