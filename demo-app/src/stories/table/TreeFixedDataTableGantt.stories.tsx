
import { TreeFixedDataTableRRC } from "@crispico/foundation-react/components/treeFixedDataTable/TreeFixedDataTable";
import { Main, Task, root, Segment } from "@crispico/foundation-react/components/treeFixedDataTable/TreeFixedDataTable.stories";
import { ReduxReusableComponents } from "@crispico/foundation-react/reduxReusableComponents/ReduxReusableComponents";
import { Utils } from "@crispico/foundation-react/utils/Utils";
import { Group, Item, ItemRenderer, Timeline } from "@famiprog-foundation/react-gantt";
import { Cell, Column, Table } from 'fixed-data-table-2';
import { d } from "../sampleData";
import { Message } from "semantic-ui-react";
import { getKeyThenIncreaseKey } from "antd/lib/message";

export default {
    title: 'Features/Table',
};

class CustomItemRenderer extends ItemRenderer {
    render() {
        if (this.props.item.isParentSegment) {
            return <ParentItemRenderer {...this.props}/>
        } else {
            return super.render();
        }
    }
}

class ParentItemRenderer extends ItemRenderer {
    hasCustomShape() {
        return true;
    }

    drawCustomShapeRenderer() {
        const ARROW_WIDTH = 20;
        const height = this.getHeight() as number;
        // We need to make the rectangle a little bit bigger because the row height is 40 px and the actual segment height is 30.
        // So if we draw the rectangle only till the middle of the segment 
        // the text (that has 18px height) will overflow the rectangle with 3 px
        const rectangleHeight = (this.getHeight() as number) / 2 + 4;
        const rightArrowStartX = this.props.width - ARROW_WIDTH;
        const leftArrowPoints = "0," + rectangleHeight + " " + ARROW_WIDTH + "," + rectangleHeight + " " + ARROW_WIDTH / 2 + "," + height + " 0," + rectangleHeight;
        const rightArrowPoints = rightArrowStartX + "," + rectangleHeight + " " + (rightArrowStartX + ARROW_WIDTH) + "," + rectangleHeight + " " 
                                + (rightArrowStartX + ARROW_WIDTH / 2) + "," + height + " " +  rightArrowStartX + "," + rectangleHeight;

        return <>
                    <rect width={this.props.width} height={rectangleHeight} fill={this.getColor()}  fillRule="evenodd"/>
                    <polygon points={leftArrowPoints} fill={this.getColor()} fillRule="evenodd"/>
                    <polygon points={rightArrowPoints} fill={this.getColor()} fillRule="evenodd"/>
                </>
    }

    getTitleStyle() {
        return {alignSelf: "start"};
    }
}

export const TreeTable = () => {
    // adding an additional task here, so that the shape of the data appears in the Storybook code snippet
    // however, subtle detail: don't do this in prod; I mean, don't give a new "root" to the component on each render (which happens here)
    // if you'd give "root", or kept "myRoot" in the state, it would've been OK
    // however, for the purpose of this demo, being given that the dataset is tiny, we can tolerate this mistake
    const myRoot: Task = {
        ...root, subtasks: [...root.subtasks,
        {
            name: "Test", comment: "First testing phase: internal; second one: client/users.",
            segments: [{ start: d("2011-01-30"), end: d("2011-03-06"), percentComplete: 10 }],
            subtasks: [
                {
                    name: "Internal tests", comment: "", segments: [
                        { start: d("2011-01-30"), end: d("2011-02-2"), percentComplete: 5 },
                        { start: d("2011-02-15"), end: d("2011-02-18"), percentComplete: 5 }
                    ]
                },
                {
                    name: "Tests by users", comment: "", segments: [
                        { start: d("2011-02-5"), end: d("2011-02-8"), percentComplete: 0 },
                        { start: d("2011-02-10"), end: d("2011-02-12"), percentComplete: 0 },
                        { start: d("2011-02-25"), end: d("2011-02-28"), percentComplete: 0 },
                        { start: d("2011-03-2"), end: d("2011-03-6"), percentComplete: 0 }
                    ]
                },
            ]
        },
        ]
    }

    function navigateToTask(itemId: string): Task {
        return Utils.navigate(myRoot, itemId, true, Utils.defaultIdSeparator, "subtasks");
    }

    return <ReduxReusableComponents.WrapWithEnhancedStore>
        <Message>The "tree" is not a direct feature of this lib. It's provided by <code>TreeFixedDataTable</code> (from <code>foundation</code>),
            which enriches w/ tree logic a <code>Table</code> (from <code>fixed-data-table-2</code>). Of course, <code>TreeFixedDataTable</code> was
            developed targeting compatibility w/ the Gantt.</Message>
        <TreeFixedDataTableRRC id="treeFixedDataTable" root={myRoot}
            hasChildrenFunction={task => task.subtasks !== undefined}
            getChildrenFunction={task => Object.keys(task.subtasks).map(key => { return { localId: key, item: task.subtasks[key] } })}
            initialExpandedIds={{ 1: true, 2: true, [`2${Utils.defaultIdSeparator}0`]: true }}
            renderMainElementFunction={({ mainChildren, linearizedItems }) => {
                const items: (Item & {isParentSegment: boolean}) [] = [];
                const groups: Group[] = [];
                // using a for (instead of 2 x map()) in order to avoid 2 iterations
                linearizedItems.forEach((li, i) => {
                    groups.push({ id: i });
                    // e.g. for task1|/|task1.1 we'll navigate: tasks.subtasks["task1"].subtasks["task1.1."]
                    const task = navigateToTask(li.itemId);
                    task.segments.forEach((segment, j) => items.push({
                        key: "" + i + "." + j, row: i, start: segment.start, end: segment.end, title: segment.percentComplete + "%",
                        color: segment.percentComplete == 0 ? "#FA0000" : (segment.percentComplete === 100 ? "#9ACD32" : "#FFA500"),
                        isParentSegment: task.subtasks != undefined && task.subtasks.length > 0
                    }))
                });

                return <Timeline startDate={d('2011-01-08')} endDate={d('2011-03-08')}
                    groups={groups} items={items}
                    table={<Table rowHeight={50} headerHeight={50}
                        width={420} height={300}>
                        <Column header={<Cell>Name</Cell>} width={400} cell={props => mainChildren[props.rowIndex]} />
                    </Table>
                    } 
                    itemRenderer={CustomItemRenderer}/>
            }}
            renderItemFunction={({ linearizedItem }) => navigateToTask(linearizedItem.itemId).name}
        />
    </ReduxReusableComponents.WrapWithEnhancedStore>
}