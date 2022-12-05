import { Alert } from 'antd';
import React from 'react';
import Timeline from '../../timeline';
import { BackgroundLayer } from '../../components/BackgroundLayer';
import { HighlightedInterval } from '../../components/HighlightedInterval';
import { Marker } from '../../components/Marker';
import { d, someHumanResources, someTasks, startOfCurrentMonth, endOfCurrentMonth, dateAndHourOfCurrentMonth } from '../sampleData';
import { backgroundLayerScenarios } from './BackgroundLayerScenarios';
export default {
  title: 'Features/Background Layer'
};

export const Main = () => {
  return (
    <Timeline startDate={startOfCurrentMonth()}
      endDate={endOfCurrentMonth()} groups={someHumanResources} items={[]}
      backgroundLayer={
        <BackgroundLayer verticalGrid nowMarker highlightWeekends
          highlightedIntervals={[
            <HighlightedInterval start={dateAndHourOfCurrentMonth(15)} end={dateAndHourOfCurrentMonth(18)} />,
            <HighlightedInterval start={dateAndHourOfCurrentMonth(20, 19)} end={dateAndHourOfCurrentMonth(21, 10)} />
          ]}
          markers={[
            <Marker start={dateAndHourOfCurrentMonth(10, 12)} />,
            <Marker start={dateAndHourOfCurrentMonth(15, 12)} />
          ]}
        />}
    />
  );
};

Main.parameters = {
  scenarios: [
    backgroundLayerScenarios.verticalGrid,
    backgroundLayerScenarios.nowMarker,
    backgroundLayerScenarios.highlightWeekends,
    backgroundLayerScenarios.markers,
    backgroundLayerScenarios.highlightedIntervals
  ]
}

export const CustomClassNamesAndStyles = () => {
  return (
    <Timeline startDate={startOfCurrentMonth()}
      endDate={endOfCurrentMonth()} groups={someHumanResources} items={[]}
      backgroundLayer={
        <BackgroundLayer verticalGrid verticalGridClassName='story-custom-vertical-grid-class'
          nowMarker nowMarkerClassName='story-custom-now-marker-class'
          highlightWeekends highlightWeekendsClassName='story-custom-highlighted-weekends-class'
          highlightedIntervals={[
            <HighlightedInterval className='story-custom-highlighted-interval-class' start={dateAndHourOfCurrentMonth(15)} end={dateAndHourOfCurrentMonth(18)} />,
            <HighlightedInterval className='story-custom-highlighted-interval-class' start={dateAndHourOfCurrentMonth(20, 19)} end={dateAndHourOfCurrentMonth(21, 10)} />
          ]}
          markers={[
            <Marker className='story-custom-marker-class' start={dateAndHourOfCurrentMonth(10, 12)} />,
            <Marker className='story-custom-marker-class' start={dateAndHourOfCurrentMonth(15, 12)} />
          ]}
        />}
    />
  );
};

CustomClassNamesAndStyles.parameters = {
  scenarios: [
    backgroundLayerScenarios.verticalGridClassName,
    backgroundLayerScenarios.nowMarkerClassName,
    backgroundLayerScenarios.highlightWeekendsClassName,
    backgroundLayerScenarios.classNameForMarker,
    backgroundLayerScenarios.highlightedIntervalClassName
  ]
}