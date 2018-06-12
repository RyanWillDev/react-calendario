import * as React from 'react';
import { render, Simulate } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Calendario from '../Calendario';
import { ChildProps, CalendarioProps } from '../types';

const createCalendario = (props: CalendarioProps) => <Calendario {...props} />;

describe('Calendario changeMonth', () => {
  test('incrementMonth increments the current month by 1', () => {
    const { getByTestId } = render(
      createCalendario({
        startDate: new Date(2018, 0),
        render: ({ i18n, currentMonth, incrementMonth }: ChildProps) => (
          <div>
            <h1 data-testid="date">{i18n.monthsFull[currentMonth]}</h1>
            <button data-testid="btn" onClick={incrementMonth} />
          </div>
        ),
      })
    );

    Simulate.click(getByTestId('btn'));
    expect(getByTestId('date')).toHaveTextContent('february');
  });

  test('decrementMonth decrements the current month by 1', () => {
    const { getByTestId } = render(
      createCalendario({
        startDate: new Date(2018, 2),
        render: ({ i18n, currentMonth, decrementMonth }: ChildProps) => (
          <div>
            <h1 data-testid="date">{i18n.monthsFull[currentMonth]}</h1>
            <button data-testid="btn" onClick={decrementMonth} />
          </div>
        ),
      })
    );

    Simulate.click(getByTestId('btn'));
    expect(getByTestId('date')).toHaveTextContent('february');
  });

  describe('when changing month rolls to a new year', () => {
    test('incrementMonth increments the current month and year by 1', () => {
      const { getByTestId } = render(
        createCalendario({
          startDate: new Date(2017, 11),
          render: ({
            i18n,
            currentMonth,
            currentYear,
            incrementMonth,
            nextMonth,
          }: ChildProps) => (
            <div>
              <h1 data-testid="date">
                {i18n.monthsFull[currentMonth]} {currentYear}
              </h1>
              <div />
              <button data-testid="btn" onClick={incrementMonth}>
                {i18n.monthsFull[nextMonth]}
              </button>
            </div>
          ),
        })
      );

      expect(getByTestId('btn')).toHaveTextContent('january');
      Simulate.click(getByTestId('btn'));
      expect(getByTestId('date')).toHaveTextContent('january 2018');
    });

    test('decrementMonth decrements the current month and year by 1', () => {
      const { getByTestId } = render(
        createCalendario({
          startDate: new Date(2018, 0),
          render: ({
            i18n,
            currentMonth,
            currentYear,
            decrementMonth,
            previousMonth,
          }: ChildProps) => (
            <div>
              <h1 data-testid="date">
                {i18n.monthsFull[currentMonth]} {currentYear}
              </h1>
              <div />
              <button data-testid="btn" onClick={decrementMonth}>
                {i18n.monthsFull[previousMonth]}
              </button>
            </div>
          ),
        })
      );

      expect(getByTestId('btn')).toHaveTextContent('december');
      Simulate.click(getByTestId('btn'));
      expect(getByTestId('date')).toHaveTextContent('december 2017');
    });
  });
});
