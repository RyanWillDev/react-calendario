import * as React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Calendario from '../Calendario';
import { ChildProps, CalendarioProps } from '../types';

const createCalendario = (props: CalendarioProps) => <Calendario {...props} />;

describe('Calendario startDate prop', () => {
  it('creates a calendar from CalendarioDate if provided as startDate prop', () => {
    const { getByTestId } = render(
      createCalendario({
        startDate: {
          year: 2018,
          month: 0,
          day: 1,
          value: '',
          siblingMonth: false,
        },
        render: ({ currentYear, currentMonth }: ChildProps) => (
          <div>
            <span data-testid="currentYear">Current year: {currentYear}</span>
            <span data-testid="currentMonth">
              Current month: {currentMonth}
            </span>
          </div>
        ),
      })
    );

    expect(getByTestId('currentYear')).toHaveTextContent('Current year: 2018');
    expect(getByTestId('currentMonth')).toHaveTextContent('Current month: 0');
  });

  it('creates a calendar from native Date if provided as startDate prop', () => {
    const { getByTestId } = render(
      createCalendario({
        startDate: new Date(2018, 0),
        render: ({ currentYear, currentMonth }: ChildProps) => (
          <div>
            <span data-testid="currentYear">Current year: {currentYear}</span>
            <span data-testid="currentMonth">
              Current month: {currentMonth}
            </span>
          </div>
        ),
      })
    );

    expect(getByTestId('currentYear')).toHaveTextContent('Current year: 2018');
    expect(getByTestId('currentMonth')).toHaveTextContent('Current month: 0');
  });

  it('creates a calendar from the current date if startDate prop was not provided', () => {
    const { getByTestId } = render(
      createCalendario({
        render: ({ currentYear, currentMonth }: ChildProps) => (
          <div>
            <span data-testid="currentYear">Current year: {currentYear}</span>
            <span data-testid="currentMonth">
              Current month: {currentMonth}
            </span>
          </div>
        ),
      })
    );

    const currentDate = new Date();

    expect(getByTestId('currentYear')).toHaveTextContent(
      `Current year: ${currentDate.getFullYear()}`
    );
    expect(getByTestId('currentMonth')).toHaveTextContent(
      `Current month: ${currentDate.getMonth()}`
    );
  });
});
