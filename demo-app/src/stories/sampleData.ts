import moment, { Moment } from 'moment';
import { Group, Item } from '@famiprog-foundation/react-gantt';

////////////////////////////////////////////////////////
// utility functions used for hardcoding our sample data
////////////////////////////////////////////////////////
export const d = (str: moment.MomentInput) => moment(str).valueOf();

export const endOfCurrentMonth = () => d(moment().endOf('month'));

export const startOfCurrentMonth = () => d(moment().startOf('month'));

export const dateAndHourOfCurrentMonth = (day, hour = 0) => d(moment().startOf('month').add('days', day-1).add('hours', hour));

export const dateAndHourOfMonth = (monthBegining, day, hour = 0) => d(monthBegining.startOf('month').add('days', day-1).add('hours', hour));

////////////////////////////////////////////////////////
// sample data
////////////////////////////////////////////////////////
export type Employee = Group & {
  job?: string,
  team?: string
} 

export const someHumanResources: Employee[] = [
  {id: 0, title: 'John Doe', job: 'HR manager', team: 'Team 1'},
  {id: 1, title: 'Alex Randal', job: 'Recruiter', team: 'Team 2'},
  {id: 2, title: 'Mary Danton', job: 'Developer', team: 'Team 3'},
  {id: 3, title: 'Kim Price', job: 'Developer', team: 'Team 3'}
];

// 10 rows, so it's easy to remember in stories: new tasks start from 11
export const someTasks: Item[] = [
  {key: 0, row: 0, title: 'Task JD1', start: d('2018-09-20 8:00'), end: d('2018-09-20 11:00')},
  {key: 1, row: 0, title: 'Task JD2', start: d('2018-09-20 18:00'), end: d('2018-09-20 19:00')},
  {key: 2, row: 0, title: 'Task JD3', start: d('2018-09-20 20:00'), end: d('2018-09-20 21:00')},
  {key: 3, row: 1, title: 'Task AR1', start: d('2018-09-20 7:00'), end: d('2018-09-20 11:30')},
  {key: 4, row: 1, title: 'Task AR2', start: d('2018-09-20 17:00'), end: d('2018-09-20 20:00')},
  {key: 5, row: 1, title: 'Task AR3', start: d('2018-09-20 19:00'), end: d('2018-09-20 20:00')},
  {key: 6, row: 2, title: 'Task MD1', start: d('2018-09-20 8:00'), end: d('2018-09-20 10:00')},
  {key: 7, row: 2, title: 'Task MD2', start: d('2018-09-20 18:00'), end: d('2018-09-20 20:00')},
  {key: 8, row: 2, title: 'Task MD3', start: d('2018-09-20 20:00'), end: d('2018-09-20 21:00')},
  {key: 9, row: 2, title: 'Task MD4', start: d('2018-09-20 5:00'), end: d('2018-09-20 7:00')},
  {key: 10, row: 2, title: 'Task MD5', start: d('2018-09-20 13:00'), end: d('2018-09-20 14:00')},
  {key: 11, row: 2, title: 'Task MD6', start: d('2018-09-20 22:00'), end: d('2018-09-20 24:00')}
];

// duplicate from someTasks, changed start/end to moment
export const someTasks2: Item[] = [
  {key: 0, row: 0, title: 'Task JD1', start: moment('2018-09-20 8:00'), end: moment('2018-09-20 11:00')},
  {key: 1, row: 0, title: 'Task JD2', start: moment('2018-09-20 18:00'), end: moment('2018-09-20 19:00')},
  {key: 2, row: 0, title: 'Task JD3', start: moment('2018-09-20 20:00'), end: moment('2018-09-20 21:00')},
  {key: 3, row: 1, title: 'Task AR1', start: moment('2018-09-20 7:00'), end: moment('2018-09-20 11:30')},
  {key: 4, row: 1, title: 'Task AR2', start: moment('2018-09-20 17:00'), end: moment('2018-09-20 20:00')},
  {key: 5, row: 1, title: 'Task AR3', start: moment('2018-09-20 19:00'), end: moment('2018-09-20 20:00')},
  {key: 6, row: 2, title: 'Task MD1', start: moment('2018-09-20 8:00'), end: moment('2018-09-20 10:00')},
  {key: 7, row: 2, title: 'Task MD2', start: moment('2018-09-20 18:00'), end: moment('2018-09-20 20:00')},
  {key: 8, row: 2, title: 'Task MD3', start: moment('2018-09-20 20:00'), end: moment('2018-09-20 21:00')},
  {key: 9, row: 2, title: 'Task MD4', start: moment('2018-09-20 5:00'), end: moment('2018-09-20 7:00')},
  {key: 10, row: 2, title: 'Task MD5', start: moment('2018-09-20 13:00'), end: moment('2018-09-20 14:00')},
  {key: 11, row: 2, title: 'Task MD6', start: moment('2018-09-20 22:00'), end: moment('2018-09-20 24:00')}
];

export const manyHumanResources: Employee[] = [...someHumanResources, { id: 4, title: 'George Walsh', job: 'Developer' }, 
{ id: 5, title: 'Mary McDonald', job: 'Developer' },
{ id: 6, title: 'Mary A. McDonald', job: 'Developer'},
{ id: 7, title: 'John Rider', job: 'Developer'},
{ id: 8, title: 'Tom Smith', job: 'Developer'},
{ id: 9, title: 'David Johnson', job: 'Developer'},
{ id: 10, title: 'James Johnson', job: 'Developer'},
{ id: 11, title: 'Maria Garcia', job: 'Developer'},
{ id: 12, title: 'Michael Smith', job: 'Developer'},
{ id: 13, title: 'David Brown', job: 'Developer'},
{ id: 14, title: 'Mary B. McDonald', job: 'Developer'},
{ id: 15, title: 'John B. Rider', job: 'Developer'},
{ id: 16, title: 'Tom B. Smith', job: 'Developer'},
{ id: 17, title: 'David B. Johnson', job: 'Developer'},
{ id: 18, title: 'James B. Johnson', job: 'Developer'},
{ id: 19, title: 'Maria B. Garcia', job: 'Developer'},
{ id: 20, title: 'Michael B. Smith', job: 'Developer'},
{ id: 21, title: 'David B. Brown', job: 'Developer'},
{ id: 22, title: 'Michael C. Smith', job: 'Developer'},
{ id: 23, title: 'David C. Brown', job: 'Developer'},
{ id: 24, title: 'Michael D. Smith', job: 'Developer'},
{ id: 25, title: 'David D. Brown', job: 'Developer'},
{ id: 26, title: 'Michael E. Smith', job: 'Developer'},
{ id: 27, title: 'David E. Brown', job: 'Developer'}];

const ITEM_DURATIONS = [moment.duration(6, 'hours'), moment.duration(12, 'hours'), moment.duration(18, 'hours')];
const COLORS = ['#0099cc', '#f03a36', '#06ad96', '#fce05b', '#dd5900', '#cc6699'];

export const [lotsOfGroups, lotsOfItems] = generateRandomRowsAndItems(100, 30, true, 60, moment('2018-07-31'),  moment('2018-10-30'));

export function generateRandomRowsAndItems(numberOfRows, numberOfItemsPerRow: number, useMoment: boolean, snap: number, minDate: Moment, maxDate: Moment): [Group[], Item[]] {
  const lotsOfGroups:Group[] = [];
  const lotsOfItems:Item[] = [];

  if (lotsOfGroups.length == 0) {
    for (let i = 0; i < numberOfRows; i++) {
      const randomGroupWithItems = generateRandomRow(i, numberOfItemsPerRow, useMoment, snap, minDate,  maxDate);  
      lotsOfGroups.push(randomGroupWithItems[0]);
      lotsOfItems.push(...randomGroupWithItems[1]);
    }
  }
  return [lotsOfGroups, lotsOfItems];
}

export function generateRandomRow(rowIndex:number, numberOfItemsPerRow: number, useMoment: boolean, snap: number, minDate: Moment, maxDate: Moment): [Group, Item[]] {
  const row = {id: rowIndex, title: `Row ${rowIndex}`, description: `Description for row ${rowIndex}`};
  const items = [];
  let key = rowIndex * numberOfItemsPerRow - 1;
  for (let j = 0; j < numberOfItemsPerRow; j++) {
    key += 1;
    const colorIndex = (rowIndex + j) % (COLORS.length + 1);
    const color = colorIndex != COLORS.length + 1 ? COLORS[colorIndex] : '';
    const gradientStop = Math.random() * 100;
    let glowOnHover = false;
    let tooltip;
    if ((rowIndex + j) % 3 === 0) {
      glowOnHover = true;
      tooltip = 'Item with key=' + key;
    }
    const duration = ITEM_DURATIONS[Math.floor(Math.random() * ITEM_DURATIONS.length)];
    let start = moment(
      Math.floor(
        Math.random() * (maxDate.valueOf() - minDate.valueOf()) + minDate.valueOf()
      )
    );
    let end = start.clone().add(duration);

    // Round to the nearest snap distance
    const roundedStartSeconds = Math.floor(start.second() / snap) * snap;
    const roundedEndSeconds = Math.floor(end.second() / snap) * snap;
    start.second(roundedStartSeconds);
    end.second(roundedEndSeconds);

    items.push({
      key: key,
      title: duration.humanize(),
      color,
      row: rowIndex,
      start: useMoment ? start : start.valueOf(),
      end: useMoment ? end : end.valueOf(),
      glowOnHover,
      gradientStop,
      tooltip
    });
  }
  return [row, items]
}    