import { ComponentStory } from '@storybook/react';
import Timeline from '../../timeline';
import { d, someHumanResources, someTasks } from '../sampleData';
import React, { Fragment } from 'react';
import { Action } from '../../types';

export default {
  title: 'Features/Context Menu',
  component: Timeline
};

class ColorPickerActionRenderer extends React.Component {
    //TODO DB: implement this
}

export const ContextMenuStory: ComponentStory<typeof Timeline> = () => {
   class ContextMenuDemo extends React.Component {
        actions: Action[] = [
            { icon: "trash",
                label: "Delete",
                isVisible: selectedItems => {/*TODO DB implement this only visible for some tasks*/} ,
                run: selectedItems => {this.setState({tasks: someTasks.filter(task => selectedItems.contains(task.key))})},
                closeMenuAfterRun: true
            },
            { icon: "edit",
                label: "Edit",
                isVisible: selectedItems => true ,
                run: (selectedItems) => {this.setState({tasks: someTasks.filter(task => selectedItems.contains(task.key))})},
                closeMenuAfterRun: true
            },
            { isVisible: selectedItems => true ,
                customRenderer : ColorPickerActionRenderer
            }];

        constructor(props) {
            super(props);
            this.state = {
                tasks:  someTasks
            };
        }

        render() {

            return (
            <Fragment>
                <div style={{ display: 'flex', height: '400px' }}>
                <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={someHumanResources} items={someTasks} 
                     actions={this.actions}/>
            </div>
            </Fragment>
        );
        }
    }
    return <ContextMenuDemo/>;
};

ContextMenuStory.parameters = {
  scenarios: [
  ]
};