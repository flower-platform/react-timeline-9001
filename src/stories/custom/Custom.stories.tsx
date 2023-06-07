import { ComponentStory } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import { Segment } from "semantic-ui-react";
import PropTypes from 'prop-types';
import Timeline from "../../timeline";
import { d, someHumanResources, someTasks } from "../sampleData";
import { customTimelineScenarios } from "./CustomTimelineScenarios";
import ReactDOM from "react-dom";
import { ItemRenderer } from "../..";
import { Table, Column, DataCell} from 'fixed-data-table-2';

export default {
  title: 'Features/Custom',
  component: Timeline
};

export const CustomMenuButtonRenderer: ComponentStory<typeof Timeline> = () => {

  class CustomTimeline extends Timeline {
    static propTypes = {
      ...Timeline.propTypes,
      /**
       * @type { JSX.Element }
       */
      toolbarDomElement: PropTypes.object.isRequired
    };

    renderMenuButton() {
      return this.props.toolbarDomElement
        ? ReactDOM.createPortal(super.renderMenuButton(), this.props.toolbarDomElement)
        : super.renderMenuButton();
    }
  }

  const divRef = useRef<any>();
  const [value, setValue] = useState(0);
  // after first render when the div dom element is created for re-render 
  useEffect(() => { !value && setValue(value => value + 1) });

  return (<>
    <Segment size="mini">
      <div ref={divRef}> </div>
    </Segment>
    <CustomTimeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={someHumanResources} items={someTasks} 
      table={<Table width={100} >
                <Column
                    columnKey="title"
                    width={100}
                    header={<DataCell>Title</DataCell>}
                    cell={({rowIndex}) => <DataCell>{rowIndex < someHumanResources.length ? someHumanResources[rowIndex].title : ""}</DataCell>}/>
            </Table>}
    toolbarDomElement={divRef.current} itemRenderer={ItemRenderer}/>
  </>);

};

CustomMenuButtonRenderer.parameters = {
  scenarios: Object.keys(customTimelineScenarios).map(key => customTimelineScenarios[key])
};
