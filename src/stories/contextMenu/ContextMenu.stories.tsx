import { ComponentStory } from '@storybook/react';
import Timeline from '../../timeline';
import { d, someHumanResources, someTasks } from '../sampleData';
import React, { Fragment } from 'react';

export default {
  title: 'Features/Context Menu',
  component: Timeline
};

export const ContextMenuStory: ComponentStory<typeof Timeline> = () => {
   class ContextMenuDemo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                selectedItems: []
            };

        }

        render() {
            const {selectedItems} = this.state;

            return (
            <Fragment>
                <div style={{ display: 'flex', height: '400px' }}>
                <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={someHumanResources} items={someTasks} 
                     selectedItems={selectedItems}/>
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