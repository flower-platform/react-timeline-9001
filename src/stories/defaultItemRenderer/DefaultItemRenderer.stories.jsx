import React from 'react';
import moment from 'moment';
import Timeline from '../../timeline';
import DefaultItemRenderer from '../../components/renderers';
import {defaultItemRendererScenarios} from '../../DefaultItemRendererScenarios';

export default {
  title: 'Features/Default Item Renderer'
};

export const ItemRendererProps = () => {
  return (
    <>
      <div className="demo">
        <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={humanResources} items={tasks} />
      </div>
    </>
  );
};

export const Main = () => {
  // utility function
  const d = str => moment(str).valueOf();

  // the rows (aka groups)
  // id is mandatory; should: be numeric, start from 0, have consecutive values
  const humanResources = [
    {id: 0, title: 'John Doe'},
    {id: 1, title: 'Alex Randal'},
    {id: 2, title: 'Mary Danton'},
    {id: 3, title1: 'Alex Randal'}
  ];

  // the segments
  // key is mandatory; row should point to the "id" of a row/group
  const tasks = [
    {key: 0, row: 0, title: 'Task JD1', start: d('2018-09-20 8:00'), end: d('2018-09-20 9:00')},
    {key: 1, row: 0, title: 'Task JD2', start: d('2018-09-20 18:00'), end: d('2018-09-20 19:00')},
    {key: 2, row: 0, title: 'Task JD3', start: d('2018-09-20 20:00'), end: d('2018-09-20 21:00')},
    {key: 3, row: 1, title: 'Task AR1', start: d('2018-09-20 7:00'), end: d('2018-09-20 8:00')},
    {key: 4, row: 1, title: 'Task AR2', start: d('2018-09-20 17:00'), end: d('2018-09-20 20:00')},
    {key: 5, row: 1, title: 'Task AR3', start: d('2018-09-20 19:00'), end: d('2018-09-20 20:00')},
    {key: 6, row: 2, title: 'Task MD1', start: d('2018-09-20 8:00'), end: d('2018-09-20 10:00')},
    {key: 7, row: 2, title: 'Task MD2', start: d('2018-09-20 18:00'), end: d('2018-09-20 20:00')},
    {key: 8, row: 2, title: 'Task MD3', start: d('2018-09-20 20:00'), end: d('2018-09-20 21:00')}
  ];

  return (
    <>
      <div className="demo">
        <Timeline startDate={d('2018-09-20')} endDate={d('2018-09-21')} groups={humanResources} items={tasks} />
      </div>
    </>
  );
};

Main.parameters = {
  scenarios: [defaultItemRendererScenarios.givenBasicSegmentsThenRender]
};

const humanResources = [
  {id: 0, title: 'John Doe'},
  {id: 1, title: 'Alex Randal'},
  {id: 2, title: 'Mary Danton'},
  {id: 3, title1: 'Alex Randal'}
];

const d = str => moment(str).valueOf();

const tasks = [
  {key: 0, row: 0, title: 'Task JD1', start: d('2018-09-20 8:00'), end: d('2018-09-20 9:00')},
  {key: 1, row: 0, title: 'Task JD2', start: d('2018-09-20 18:00'), end: d('2018-09-20 19:00')},
  {key: 2, row: 0, title: 'Task JD3', start: d('2018-09-20 20:00'), end: d('2018-09-20 21:00')},
  {key: 3, row: 1, title: 'Task AR1', start: d('2018-09-20 7:00'), end: d('2018-09-20 8:00')},
  {key: 4, row: 1, title: 'Task AR2', start: d('2018-09-20 17:00'), end: d('2018-09-20 20:00')},
  {key: 5, row: 1, title: 'Task AR3', start: d('2018-09-20 19:00'), end: d('2018-09-20 20:00')},
  {key: 6, row: 2, title: 'Task MD1', start: d('2018-09-20 8:00'), end: d('2018-09-20 10:00')},
  {key: 7, row: 2, title: 'Task MD2', start: d('2018-09-20 18:00'), end: d('2018-09-20 20:00')},
  {key: 8, row: 2, title: 'Task MD3', start: d('2018-09-20 20:00'), end: d('2018-09-20 21:00')}
];

export const WithCustomStyle = () => {
  // custom style that will be applied for all the items
  const customItemStyle = {
    opacity: 0.5,
    border: '2px blue solid',
    borderRadius: '7px'
  };

  return (
    <>
      <div className="demo">
        <Timeline
          startDate={d('2018-09-20')}
          endDate={d('2018-09-21')}
          groups={humanResources}
          items={tasks}
          itemStyle={customItemStyle}
        />
      </div>
    </>
  );
};

WithCustomStyle.parameters = {
  scenarios: [
    defaultItemRendererScenarios.givenSegmentsThenRender,
    defaultItemRendererScenarios.givenCustomStyleForSegmentsThenRender
  ]
};

export const WithCustomClassName = () => {
  // custom class name that will be applied for all the items
  const customItemClassName = 'story-custom-item-class';

  return (
    <>
      <div className="demo">
        <Timeline
          startDate={d('2018-09-20')}
          endDate={d('2018-09-21')}
          groups={humanResources}
          items={tasks}
          itemClassName={customItemClassName}
        />
      </div>
    </>
  );
};

WithCustomClassName.parameters = {
  scenarios: [
    defaultItemRendererScenarios.givenSegmentsThenRender,
    defaultItemRendererScenarios.givenCustomClassNameForSegmentsThenRender
  ]
};

export const WithTooltip = () => {
  // the segments, each segment having a tooltip
  const tasksWithTooltip = tasks.map(task => {
    return {...task, tooltip: 'This is ' + task.title};
  });

  return (
    <>
      <div className="demo">
        <Timeline
          startDate={d('2018-09-20')}
          endDate={d('2018-09-21')}
          groups={humanResources}
          items={tasksWithTooltip}
        />
      </div>
    </>
  );
};

WithTooltip.parameters = {
  scenarios: [
    defaultItemRendererScenarios.givenSegmentsWithTooltipPropertyThenRender,
    defaultItemRendererScenarios.whenMouseOverSegmentWithTooltipThenRenderTooltip
  ]
};

export const WithGlowOnHover = () => {
  // the segments, each segment having glow on hover
  const tasksWithTooltip = tasks.map(task => {
    return {...task, glowOnHover: true};
  });

  return (
    <>
      <div className="demo">
        <Timeline
          startDate={d('2018-09-20')}
          endDate={d('2018-09-21')}
          groups={humanResources}
          items={tasksWithTooltip}
        />
      </div>
    </>
  );
};

WithGlowOnHover.parameters = {
  scenarios: [
    defaultItemRendererScenarios.givenSegmentsWithGlowThenRender,
    defaultItemRendererScenarios.whenMouseOverSegmentWithGlowThenRender
  ]
};

export const WithCustomizedGradient = () => {
  // the segments with different gradient properties
  const tasksWithGradient = [
    {
      key: 0,
      row: 0,
      title: 'Task JD1',
      color: 'red',
      gradientBrightness: 70,
      start: d('2018-09-20 8:00'),
      end: d('2018-09-20 9:00')
    },
    {
      key: 1,
      row: 0,
      title: 'Task JD2',
      color: 'red',
      gradientStop: 10,
      gradientBrightness: 70,
      start: d('2018-09-20 18:00'),
      end: d('2018-09-20 19:00')
    },
    {
      key: 2,
      row: 0,
      title: 'Task JD3',
      color: 'red',
      gradientStop: 10,
      gradientBrightness: 70,
      reverseDirection: true,
      start: d('2018-09-20 20:00'),
      end: d('2018-09-20 21:00')
    },
    {
      key: 3,
      row: 1,
      title: 'Task AR1',
      color: 'yellow',
      gradientBrightness: 70,
      start: d('2018-09-20 7:00'),
      end: d('2018-09-20 8:00')
    },
    {
      key: 4,
      row: 1,
      title: 'Task AR2',
      color: 'yellow',
      gradientStop: 10,
      gradientBrightness: 70,
      start: d('2018-09-20 17:00'),
      end: d('2018-09-20 20:00')
    },
    {
      key: 5,
      row: 1,
      title: 'Task AR3',
      color: 'yellow',
      gradientStop: 10,
      gradientBrightness: 70,
      reverseDirection: true,
      start: d('2018-09-20 19:00'),
      end: d('2018-09-20 20:00')
    },
    {
      key: 6,
      row: 2,
      title: 'Task MD1',
      color: 'blue',
      gradientBrightness: 70,
      start: d('2018-09-20 8:00'),
      end: d('2018-09-20 10:00')
    },
    {
      key: 7,
      row: 2,
      title: 'Task MD2',
      color: 'blue',
      gradientStop: 10,
      gradientBrightness: 70,
      start: d('2018-09-20 18:00'),
      end: d('2018-09-20 20:00')
    },
    {
      key: 8,
      row: 2,
      title: 'Task MD3',
      color: 'blue',
      gradientStop: 10,
      gradientBrightness: 70,
      reverseDirection: true,
      start: d('2018-09-20 20:00'),
      end: d('2018-09-20 21:00')
    }
  ];

  return (
    <>
      <div className="demo">
        <Timeline
          startDate={d('2018-09-20')}
          endDate={d('2018-09-21')}
          groups={humanResources}
          items={tasksWithGradient}
        />
      </div>
    </>
  );
};

WithCustomizedGradient.parameters = {
  scenarios: [
    defaultItemRendererScenarios.givenSegmentsTask1WithGradientThenRender,
    defaultItemRendererScenarios.givenSegmentsTask2WithGradientThenRender,
    defaultItemRendererScenarios.givenSegmentsTask3WithGradientThenRender
  ]
};

export const WithCustomRenderers = () => {
  // custom item renderer that delegates to other renders based on the title of the item
  class CustomItemRenderer extends DefaultItemRenderer {
    render() {
      if (this.props.item.title.endsWith('1')) {
        return <Task1CustomItemRenderer {...this.props} />;
      } else if (this.props.item.title.endsWith('2')) {
        return <Task2CustomItemRenderer {...this.props} />;
      } else {
        return <Task3CustomItemRenderer {...this.props} />;
      }
    }
  }

  class Task1CustomItemRenderer extends DefaultItemRenderer {
    getTitle() {
      return super.getTitle().replace('Task ', '');
    }

    getTextColor() {
      return 'yellow';
    }
  }

  class Task2CustomItemRenderer extends DefaultItemRenderer {
    // override to return a solid color
    getBackgroundGradient() {
      return this.getGradientColor();
    }

    getClassName() {
      return super.getClassName() + ' story-custom-item-class';
    }
  }

  class Task3CustomItemRenderer extends DefaultItemRenderer {
    getStyle() {
      return {
        ...super.getStyle(),
        borderRadius: '8px'
      };
    }

    getItemHeight() {
      return '20px';
    }
  }

  return (
    <>
      <div className="demo">
        <Timeline
          startDate={d('2018-09-20')}
          endDate={d('2018-09-21')}
          groups={humanResources}
          items={tasks}
          itemRenderer={CustomItemRenderer}
        />
      </div>
    </>
  );
};

WithCustomRenderers.parameters = {
  scenarios: [
    defaultItemRendererScenarios.givenSegmentsAndCustomItemRendererThenRender,
    defaultItemRendererScenarios.givenSegmentsTask1WithCustomItemRendererThenRender,
    defaultItemRendererScenarios.givenSegmentsTask2WithCustomItemRendererThenRender,
    defaultItemRendererScenarios.givenSegmentsTask3WithCustomItemRendererThenRender
  ]
};
