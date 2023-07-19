import { createTestids } from '@famiprog-foundation/tests-are-demo';
import { ComponentStory } from '@storybook/react';
import { Alert } from 'antd';
import React, { Fragment, useState } from 'react';
import Timeline from '../../timeline';
import { IGanttAction, IGanttOnContextMenuShowParam, Item } from '../../types';
import { d, someHumanResources, someTasks } from '../sampleData';
import { contextMenuScenarios, selectionScenarios } from './ContextMenuAndSelectionScenarios';
import { Button, Checkbox, Icon, Menu } from 'semantic-ui-react';
import { IActionParamForRun } from '../../components/ContextMenu/IAction';

export default {
    title: 'Features/Context Menu And Selection',
    includeStories: /^[A-Z]/
};

export const ContextMenu = () => {
    const [tasks, setTasks] = useState<Item[]>([...someTasks]);
    return (<>
            <Alert message={<><b>Add task</b> action is provided only for empty selection. It also has a different label depending on which row is displayed</>} />
            <div style={{ display: 'flex', height: '400px' }}>
                <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={someHumanResources} items={tasks}
                    onContextMenuShow={(contextMenuShowParam: IGanttOnContextMenuShowParam) => {
                        const actions: IGanttAction[] = [
                            {
                                icon: "edit",
                                label: "Edit",
                                isVisible: (param) => { return param.selection.length == 1; },
                                run: (param) => {
                                    param.closeContextMenu();
                                    const selectedTask = tasks.find((task) => task.key == param.selection[0]);
                                    // needed setTimeout for menu to have time to close
                                    setTimeout(() => {
                                        let newTitle = prompt("Task new title:", selectedTask.title);
                                        newTitle && setTasks(tasks.map((task) => task == selectedTask ? { ...task, title: newTitle } : task));
                                    }, 10);
                                }
                            },
                            {
                                icon: "trash",
                                label: "Delete",
                                isVisible: (param) => { return param.selection.length == 1; },
                                renderInMenu: (param) => {
                                    return <Menu.Item onClick={() => {
                                        setTasks(tasks.filter(task => !param.selection.includes(task.key)));
                                        param.closeContextMenu();
                                    }}>
                                        {/** This is a trivial example for customizing the content of an action renderer 
                                                     * but this content can be replaced according to application needs with a more complex one: 
                                                     * e.g. maybe containing a color picker (for an action that changes the color of a segment)*/}
                                        <span style={{ color: "red" }}>Delete</span>
                                        <Icon name="trash" color='red' />
                                    </Menu.Item>
                                }
                            }
                        ];
                        // We can filter the actions that will be displayed directly here in the actions provider    
                        if (contextMenuShowParam.actionParam.row < someHumanResources.length) {
                            actions.splice(0, 0, {
                                icon: "plus",
                                label: (param) => {
                                    return "Add task for " + someHumanResources[param.row].title
                                },
                                run: (param) => {
                                    setTasks([...tasks, { key: tasks.length, row: param.row, title: 'NEW TASK', start: d('2018-09-20 1:00'), end: d('2018-09-20 3:00') }]);
                                    param.closeContextMenu();
                                }
                            });
                        } else {
                            actions.splice(0, 0, { icon: "plus", label: () => "Add task: not possible. Please right click over a row with a person."});
                        }
                        return actions;
                    }} />
            </div>
        </>);
};

ContextMenu.parameters = {
    scenarios: [
        ...Object.keys(contextMenuScenarios).map(key => contextMenuScenarios[key])
    ]
};

const testIds = createTestids('SelectionStory', {
    selectedItemsSpan: ''
});
export const selectionStoryTestIds = testIds;

export const Selection = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isSelectionForced, setIsSelectionForced] = useState<boolean>(false);
    return (<>
        <span>
            <Button toggle active={isSelectionForced} onClick={() => setIsSelectionForced(!isSelectionForced)}>
                Force selection programmatically
            </Button>
            (The user cannot change the selection via interaction)
        </span>
        <Alert message={<>Selected segments: <span data-testid={testIds.selectedItemsSpan}>{selectedItems.sort().join(", ")}</span></>} />
        {/* This is an example illustrates: 
            1.adding onSelectionChange handler 
            2.setting selectedItems property */}
        <div style={{ display: 'flex', height: '400px' }}>
            <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={someHumanResources} items={someTasks}
                selectedItems={isSelectionForced ? [0, 1] : undefined} onSelectionChange={selectedItems => setSelectedItems(selectedItems)} />
        </div>
    </>);
};

Selection.parameters = {
    scenarios: [
        ...Object.keys(selectionScenarios).map(key => selectionScenarios[key])
    ]
};