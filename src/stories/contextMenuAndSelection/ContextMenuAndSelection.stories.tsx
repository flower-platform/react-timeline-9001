import { createTestids } from '@famiprog-foundation/tests-are-demo';
import { Alert } from 'antd';
import { Fragment, useState } from 'react';
import { Button, Form, MenuItem, Radio } from 'semantic-ui-react';
import Timeline from '../../timeline';
import { IGanttAction, IGanttOnContextMenuShowParam, Item } from '../../types';
import { d, someHumanResources, someTasks } from '../sampleData';
import { contextMenuScenarios, selectionScenarios } from './ContextMenuAndSelectionScenarios';
import moment from 'moment';

export const contextMenuStoryTestIds = createTestids('ContextMenuAndSelection', {
    customRendererRadioSmall: '',
    customRendererRadioMedium: '',
    customRendererRadioLarge: ''
})

export default {
    title: 'Features/Context Menu And Selection',
    includeStories: /^[A-Z]/
};

export const addTaskActionLabel = "Add task for ";
export const addTaskActionIcon = "plus";
export const editActionLabel = "Edit";
export const deleteActionLabel = "Delete";
export const ContextMenu = () => {
        const [tasks, setTasks] = useState<Item[]>([...someTasks]);
        const [segmentHeight, setSegmentHeight] = useState<number>(40);
        // let end = moment('2018-09-20').valueOf(); 
        // end.add(3, 'hours');
        // d(moment().startOf('month').hours(15));
        return (
            <Fragment>
                <Alert message={<><b>Add task</b> action is provided only for empty selection. It also has a different label depending on which row is displayed</>}/>
                <div style={{ display: 'flex', height: '400px' }}>
                    <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={someHumanResources} items={tasks} itemHeight={segmentHeight}
                        onContextMenuShow={(contextMenuShowParam: IGanttOnContextMenuShowParam) => {
                            const actions: IGanttAction[] = [
                                {
                                    icon: "edit",
                                    label: editActionLabel,
                                    isVisible: (param) => { return param.selection.length == 1; },
                                    run: (param) => {
                                        const selectedTask = tasks.find((task) => task.key == param.selection[0]);
                                        let newTitle = prompt("Task new title:", selectedTask.title);
                                        newTitle && setTasks(tasks.map((task) => task == selectedTask ? { ...task, title: newTitle } : task));
                                        param.dontCloseContextMenuAfterRunAutomatically = true;
                                    }
                                },
                                {
                                    label: deleteActionLabel,
                                    icon: "trash",
                                    isVisible: (param) => param.selection.length > 0 ,
                                    run: (param) => setTasks(tasks.filter(task => !param.selection.includes(task.key)))
                                }
                            ];
                            // We can filter the actions that will be displayed directly here in the actions provider    
                            if (contextMenuShowParam.actionParam.selection.length == 0 && contextMenuShowParam.actionParam.row < someHumanResources.length) {
                                actions.push({
                                    icon: addTaskActionIcon,
                                    label: (param) => addTaskActionLabel + someHumanResources[param.row].title,
                                    run: (param) => { 
                                        let end = moment(param.time); 
                                        end.hours(end.hours() + 3); 
                                        setTasks([...tasks, { key: tasks.length, row: param.row, title: 'NEW TASK', start: param.time, end: end}]);
                                    }
                                });
                            }
                            // This is an example of how to add an action having a custom renderer
                            actions.push({
                                renderInMenu: (param) => {
                                    return <MenuItem><Form>
                                        <Form.Group inline>
                                            <Form.Field>
                                                <label>Segments:</label>
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio data-testid={contextMenuStoryTestIds.customRendererRadioSmall}
                                                    label='small'
                                                    name='radioGroup'
                                                    checked={segmentHeight == 30}
                                                    onChange={(e, {value}) => setSegmentHeight(30)}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio data-testid={contextMenuStoryTestIds.customRendererRadioMedium}
                                                    label='medium'
                                                    name='radioGroup'
                                                    value={40}
                                                    checked={segmentHeight == 40}
                                                    onChange={(e, {value}) => setSegmentHeight(40)}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio data-testid={contextMenuStoryTestIds.customRendererRadioLarge}
                                                    label='large'
                                                    name='radioGroup'
                                                    value={50}
                                                    checked={segmentHeight == 50}
                                                    onChange={(e, {value}) => setSegmentHeight(50)}
                                                />
                                            </Form.Field>
                                        </Form.Group>
                                    </Form></MenuItem> }});
                            return actions;
                        }} />
                </div>
            </Fragment>);
};

ContextMenu.parameters = {
    scenarios: [
        ...Object.keys(contextMenuScenarios).map(key => contextMenuScenarios[key])
    ]
};

export const selectionStoryTestIds = createTestids('SelectionStory', {
    selectedItemsSpan: ''
});

export const Selection = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isSelectionDictated, setIsSelectionDictated] = useState<boolean>(false);
    return (
      <Fragment>
        <span>
            <Button toggle active={isSelectionDictated} onClick={() => setIsSelectionDictated(!isSelectionDictated)}>
                Dictate selection (disable click/drag to select selection)
            </Button>
        </span>
        <Alert message={<>Selected segments: <span data-testid={selectionStoryTestIds.selectedItemsSpan}> {selectedItems.sort().join(" ,")}</span></>}/>
        {/* This is an example illustrates: 
            1.adding onSelectionChange handler 
            2.setting selectedItems property */}
        <div style={{ display: 'flex', height: '400px' }}>
          <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={someHumanResources} items={someTasks} 
                    selectedItems={isSelectionDictated ? [0] : undefined} onSelectionChange={(selectedItems) => setSelectedItems(selectedItems)}/>
        </div>
      </Fragment>
    );
  };

  Selection.parameters = {
    scenarios: [
        ...Object.keys(selectionScenarios).map(key => selectionScenarios[key])
    ]
};