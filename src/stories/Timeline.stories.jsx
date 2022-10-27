import React from 'react';
import moment from 'moment';

import DemoTimeline from '../demo';
import Timeline from '../timeline';
import {Alert} from 'antd';

export default {
  title: 'Internal/Timeline'
};

export const OriginalDemo = () => <DemoTimeline />;

const humanResources = [
  {id: 0, title: 'John Doe'},
  {id: 1, title: 'Alex Randal'},
  {id: 2, title: 'Mary Danton'}
];
const tasksWithMoment = [
  {key: 0, row: 0, title: 'T1', color: 'red', start: moment('2018-09-20 8:00'), end: moment('2018-09-20 9:00')},
  {key: 1, row: 0, title: 'T2', color: 'red', start: moment('2018-09-20 18:00'), end: moment('2018-09-20 19:00')},
  {key: 2, row: 0, title: 'T3', color: 'red', start: moment('2018-09-20 20:00'), end: moment('2018-09-20 21:00')},
  {key: 3, row: 1, title: 'T1', color: 'yellow', start: moment('2018-09-20 7:00'), end: moment('2018-09-20 8:00')},
  {key: 4, row: 1, title: 'T2', color: 'yellow', start: moment('2018-09-20 17:00'), end: moment('2018-09-20 20:00')},
  {key: 5, row: 1, title: 'T3', color: 'yellow', start: moment('2018-09-20 19:00'), end: moment('2018-09-20 20:00')},
  {key: 6, row: 2, title: 'T1', color: 'blue', start: moment('2018-09-20 8:00'), end: moment('2018-09-20 10:00')},
  {key: 7, row: 2, title: 'T2', color: 'blue', start: moment('2018-09-20 18:00'), end: moment('2018-09-20 20:00')},
  {key: 8, row: 2, title: 'T3', color: 'blue', start: moment('2018-09-20 20:00'), end: moment('2018-09-20 21:00')}
];

// we convert start and end from the moment object to a raw timestamp (millis)
// reminder: moment.valueOf() returns a raw timestamp (a number of millis)
const tasksWithoutMoment = tasksWithMoment.map(t => {
  return {...t, start: t.start.valueOf(), end: t.end.valueOf()};
});

export const BasicUsageWithoutMoment = () => (
  <div className="demo">
    <Alert
      message={
        <React.Fragment>
          <p>
            The Timeline was originally designed to handle date/times w/ <a href="https://momentjs.com/">Moment.js</a>,
            a popular lib. However there are 2 drawbacks. <b>#1</b>: even the authors/maintainers of Moment.js don't
            quite <a href="https://momentjs.com/docs/">recommend</a> it any more for use with new projects. The major
            complain seems to be the mutability of "moment" objects. <b>#2</b>: "moment" objects are not friendly with{' '}
            <a href="https://redux.js.org/">Redux</a>, a popular framework for state management. Many folk use React for
            state management. And not being able to store the state that feeds the Timeline is a big drawback, since
            additional conversions are necessary.
          </p>
          <p>
            The{' '}
            <b>
              property <code>useMoment</code>
            </b>{' '}
            to the rescue! If <code>false</code>, then you when you "talk" date/times to the Timeline, then you use
            plain timestamps (i.e. number of millis, e.g. <code>new Date().valueOf()</code>). And this everywhere where
            a date/time is needed (e.g. for an item, for global start/end, etc.). This is the <b>recommended</b> way to
            go, especially if you use Redux. But be aware that this property is by default <code>true</code>, in order
            to maintain backward compatibility.
          </p>
          <p>
            NOTE: the Timeline still uses "moment" internally. And this because it was quicker to refactor this way.
            This may change in the future, if we find reasons and time to refactor more.
          </p>
        </React.Fragment>
      }
    />
    <Timeline
      shallowUpdateCheck
      useMoment={false}
      items={tasksWithoutMoment}
      groups={humanResources}
      startDate={moment('2018-09-20').valueOf()}
      endDate={moment('2018-09-21').valueOf()}
    />
  </div>
);

export const BasicUsageWithMoment = () => (
  <div className="demo">
    <Timeline
      shallowUpdateCheck
      items={tasksWithMoment}
      groups={humanResources}
      startDate={moment('2018-09-20')}
      endDate={moment('2018-09-21')}
    />
  </div>
);

export const DefaultItemRendererWithTooltip = () => {
  const tasksWithTooltip = tasks.map(t => {
    return {...t, tooltip: 'Task ' + t.title};
  });

  return (
    <div className="demo">
      <Timeline
        shallowUpdateCheck
        items={tasksWithTooltip}
        groups={humanResources}
        startDate={moment('2018-09-20')}
        endDate={moment('2018-09-21')}
      />
    </div>
  );
};

export const DefaultItemRendererWithGlowOnHover = () => {
  const tasksWithGlow = tasks.map(t => {
    return {...t, glowOnHover: true};
  });

  return (
    <div className="demo">
      <Alert
        message={
          <>
            On mouse hover item, a glow effect appears around the item if <b>item.glowOnHover</b> is true.
          </>
        }
      />
      <Timeline
        shallowUpdateCheck
        items={tasksWithGlow}
        groups={humanResources}
        startDate={moment('2018-09-20')}
        endDate={moment('2018-09-21')}
      />
    </div>
  );
};

export const DefaultItemRendererWithCustomizedGradient = () => {
  const tasksWithGradient = tasks.map(t => {
    if (t.title === 'T1') {
      return {...t, gradientBrightness: 30};
    } else if (t.title === 'T2') {
      return {...t, gradientStop: 70, gradientBrightness: 60};
    } else {
      return {...t, gradientStop: 70, gradientBrightness: 60, reverseDirection: true};
    }
  });

  return (
    <div className="demo">
      <Alert
        message={
          <>
            <p>
              The item renderer used a gradient as a background. The gradient is configured using two colors:
              <ul>
                <li>
                  the base color, <b>item.color</b>
                </li>
                <li>
                  the second color is obtained by lightening the base color. <b>item.gradientBrightness</b> represents
                  the percentage of lightening applied to the base color.
                </li>
              </ul>
              <b>item.gradientStop</b> is used to indicate the point when the gradient transitions from the first color
              to the second color and it is a value between 0 and 100. The default order of the colors is (lighter
              color, base color), but it can be reversed using <b>item.reverseDirection</b>.
            </p>
            <p>
              In this example, there are three configurations, one for each type of task:
              <ol>
                <li>
                  T1 tasks - use the default gradient stop(40%), but the second color is only 30% brighter; the result
                  is a darker gradient.
                </li>
                <li>
                  T2 tasks - the second color is 60% brighter, this results in a much lighter color. But here the
                  gradient stop is also modified to 70%, this means that the first color stops at 70% from the height of
                  the item.
                </li>
                <li>T3 tasks - the same configuration as T2 tasks, but the colors are reversed.</li>
              </ol>
            </p>
          </>
        }
      />
      <Timeline
        shallowUpdateCheck
        items={tasksWithGradient}
        groups={humanResources}
        startDate={moment('2018-09-20')}
        endDate={moment('2018-09-21')}
      />
    </div>
  );
};

export const DefaultItemRendererWithCustomStyle = () => (
  <div className="demo">
    <Timeline
      shallowUpdateCheck
      items={tasks}
      itemStyle={{
        opacity: 0.5,
        border: '2px blue solid',
        borderRadius: '7px'
      }}
      groups={humanResources}
      startDate={moment('2018-09-20')}
      endDate={moment('2018-09-21')}
    />
  </div>
);

export const DefaultItemRendererWithCustomClassName = () => (
  <div className="demo">
    <Timeline
      shallowUpdateCheck
      items={tasks}
      itemClassName={'story-custom-item-class'}
      groups={humanResources}
      startDate={moment('2018-09-20')}
      endDate={moment('2018-09-21')}
    />
  </div>
);

export const CustomItemRenderer = () => {
  class Task1CustomItemRenderer extends DefaultItemRenderer {
    getTitle() {
      return super.getTitle() + ` ${this.props.item.start.format('HH:mm')} - ${this.props.item.end.format('HH:mm')}`;
    }

    getTextColor() {
      return 'blue';
    }
  }

  class Task2CustomItemRenderer extends DefaultItemRenderer {
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
        opacity: 0.6,
        borderRadius: '8px'
      };
    }

    getItemHeight() {
      return '20px';
    }
  }

  class CustomItemRenderer extends DefaultItemRenderer {
    render() {
      if (this.props.item.title === 'T1') {
        return <Task1CustomItemRenderer {...this.props} />;
      } else if (this.props.item.title === 'T2') {
        return <Task2CustomItemRenderer {...this.props} />;
      } else {
        return <Task3CustomItemRenderer {...this.props} />;
      }
    }
  }

  return (
    <div className="demo">
      <Alert
        message={
          <>
            <p>
              This is an example of a custom item renderer that delegates to sub-renderers depending on the title of the
              item.
            </p>
            <p>
              T1 tasks use a custom renderer (Task1CustomItemRenderer) that overrides <b>getTitle()</b> and{' '}
              <b>getTextColor()</b> functions.
              <ul>
                <li>
                  getTitle() - returns a custom label for the item, the title of the item plus the hour from startDate
                  and hour from endDate.
                  <br />
                </li>
                <li>getTextColor() - the new color for the text of the label is blue.</li>
              </ul>
            </p>
            <p>
              T2 tasks use a custom renderer (Task2CustomItemRenderer) that overrides <b>getBackgroundGradient()</b> and{' '}
              <b>getClassName()</b> functions.
              <ul>
                <li>
                  getBackgroundGradient() - The default item renderer uses a gradient as a background for an item, not a
                  solid color. This behaviour can be changed by overriding <b>getBackgroundGradient()</b>, that returns
                  a solid color.
                </li>
                <li>getClassName() - adds a custom css class, with a purple border and no corner rounding.</li>
              </ul>
            </p>
            <p>
              T3 tasks use a custom renderer (Task3CustomItemRenderer) that overrides <b>getItemHeight()</b> and{' '}
              <b>getStyle()</b> functions.
              <ul>
                <li>getItemHeight() - returns a custom item height.</li>
                <li>getStyle() - returns a custom style, with more rounded corners and 0.6 opacity.</li>
              </ul>
            </p>
          </>
        }
      />
      <Timeline
        shallowUpdateCheck
        items={tasks}
        groups={humanResources}
        startDate={moment('2018-09-20')}
        endDate={moment('2018-09-21')}
        itemRenderer={CustomItemRenderer}
      />
    </div>
  );
};
