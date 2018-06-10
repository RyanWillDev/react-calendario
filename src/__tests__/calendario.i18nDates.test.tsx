import * as React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Calendario from '../Calendario';
import { ChildProps, CalendarioProps } from '../types';

const createCalendario = (props: CalendarioProps) => <Calendario {...props} />;

const expectedMonthsFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const expectedMonthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const expectedWeekDaysFull = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const expectedWeekDaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const expectedWeekDaysNarrow = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

describe('Calendario i18nDates', () => {
  it('creates correct monthsFull array', () => {
    let monthsFull;

    render(
      createCalendario({
        startDate: new Date(2018, 0),
        render: ({ i18nDates }: ChildProps) => {
          monthsFull = i18nDates.monthsFull;
          return <h1 />;
        },
      })
    );
    expect(monthsFull).toEqual(expectedMonthsFull);
  });

  it('creates correct monthsShort array', () => {
    let monthsShort;

    render(
      createCalendario({
        startDate: new Date(2018, 0),
        render: ({ i18nDates }: ChildProps) => {
          monthsShort = i18nDates.monthsShort;
          return <h1 />;
        },
      })
    );
    expect(monthsShort).toEqual(expectedMonthsShort);
  });

  it('creates correct weekDaysFull array', () => {
    let weekDaysFull;

    render(
      createCalendario({
        startDate: new Date(2018, 0),
        render: ({ i18nDates }: ChildProps) => {
          weekDaysFull = i18nDates.weekDaysFull;
          return <h1 />;
        },
      })
    );
    expect(weekDaysFull).toEqual(expectedWeekDaysFull);
  });

  it('creates correct weekDaysShort array', () => {
    let weekDaysShort;

    render(
      createCalendario({
        startDate: new Date(2018, 0),
        render: ({ i18nDates }: ChildProps) => {
          weekDaysShort = i18nDates.weekDaysShort;
          return <h1 />;
        },
      })
    );
    expect(weekDaysShort).toEqual(expectedWeekDaysShort);
  });

  it('creates correct weekDaysNarrow array', () => {
    let weekDaysNarrow;

    render(
      createCalendario({
        startDate: new Date(2018, 0),
        render: ({ i18nDates }: ChildProps) => {
          weekDaysNarrow = i18nDates.weekDaysNarrow;
          return <h1 />;
        },
      })
    );
    expect(weekDaysNarrow).toEqual(expectedWeekDaysNarrow);
  });
});
