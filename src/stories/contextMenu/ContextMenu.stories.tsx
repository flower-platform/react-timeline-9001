import { ComponentStory } from '@storybook/react';
import Timeline from '../../timeline';
import { d, someHumanResources, someTasks } from '../sampleData';
import React, { Fragment } from 'react';
import { IGanttAction, IGanttOnContextMenuShowParam, Item } from '../../types';
import { Button, Form, Modal } from 'semantic-ui-react';
import { contextMenuScenarios } from './ContextMenuScenarios';

export default {
    title: 'Features/Context Menu',
    component: Timeline
};

export const Main: ComponentStory<typeof Timeline> = () => {
    class ContextMenuDemo extends React.Component<any, { tasks: Item[], editTask: Item, editTaskTitle: string }> {
        constructor(props) {
            super(props);
            this.state = {
                tasks: [...someTasks],
                editTask: undefined,
                editTaskTitle: undefined,
            };
        }

        closeEditor() {
            this.setState({ editTask: undefined });
        }

        render() {

            return (
                <Fragment>
                    <div style={{ display: 'flex', height: '400px' }}>
                        <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={someHumanResources} items={this.state.tasks}
                            onContextMenuShow={(contextMenuShowParam: IGanttOnContextMenuShowParam) => {
                                const actions: IGanttAction[] = [
                                    {
                                        icon: "trash",
                                        label: "Delete",
                                        isVisible: (param) => { return param.selection.length > 0; },
                                        run: (param) => {
                                            this.setState({ tasks: this.state.tasks.filter(task => !param.selection.includes(task.key)) });
                                            param.closeContextMenu();
                                        }
                                    },
                                    {
                                        icon: "edit",
                                        label: "Edit",
                                        isVisible: (param) => { return param.selection.length == 1; },
                                        run: (param) => {
                                            const selectedTask = this.state.tasks[param.selection[0]];
                                            this.setState({ editTask: selectedTask, editTaskTitle: selectedTask.title });
                                            param.closeContextMenu();
                                        }
                                    }
                                ];
                                // We can filter the actions that will be displayed directly here in the actions provider    
                                if (contextMenuShowParam.actionParam.selection.length == 0 && contextMenuShowParam.actionParam.row < someHumanResources.length) {
                                    actions.push({
                                        icon: "plus",
                                        label: (param) => {
                                            return "Add task for " + someHumanResources[param.row].title
                                        },
                                        run: (param) => {
                                            this.setState({ tasks: [...this.state.tasks, { key: this.state.tasks.length, row: param.row, title: 'NEW TASK', start: d('2018-09-20 1:00'), end: d('2018-09-20 3:00') }] })
                                            param.closeContextMenu();
                                        }
                                    });
                                }
                                return actions;
                            }} />
                    </div>
                    <Modal onClose={() => this.closeEditor()} open={this.state.editTask !== undefined}>
                        <Modal.Header>Task editor</Modal.Header>
                        <Modal.Content image>
                            <Form>
                                <Form.Input
                                    placeholder='Title'
                                    name='editTaskTitle'
                                    value={this.state.editTaskTitle}
                                    onChange={(e, { name, value }) => this.setState({ editTaskTitle: value })}
                                />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.closeEditor()}>
                                Cancel
                            </Button>
                            <Button
                                content="Save"
                                labelPosition='right'
                                icon='checkmark'
                                onClick={() => {
                                    this.setState({ tasks: this.state.tasks.map((task) => task == this.state.editTask ? { ...task, title: this.state.editTaskTitle } : task) });
                                    this.closeEditor();
                                }}
                                positive
                            />
                        </Modal.Actions>
                    </Modal>
                </Fragment>
            );
        }
    }
    return <ContextMenuDemo />;
};

Main.parameters = {
    scenarios: [
        Object.keys(contextMenuScenarios).map(key => contextMenuScenarios[key])
    ]
};