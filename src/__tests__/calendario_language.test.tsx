import * as React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Calendario from '../Calendario';
import { ChildProps, CalendarioProps } from '../types';

const err = console.error;
console.error = jest.fn();

const createCalendario = (props: CalendarioProps) => <Calendario {...props} />;

describe('Calendario language prop', () => {
  afterAll(() => {
    console.error = err;
  });

  it('defaults to the browser language if language prop is not provided', () => {
    const { getByTestId } = render(
      createCalendario({
        startDate: new Date(2018, 0),
        render: ({ i18n, currentMonth }: ChildProps) => (
          <h1 data-testid="date">{i18n.monthsFull[currentMonth]}</h1>
        ),
      })
    );

    expect(getByTestId('date')).toHaveTextContent('january');
  });

  it('defaults to the browser language if the provided language prop is invalid', () => {
    const { getByTestId } = render(
      createCalendario({
        startDate: new Date(2018, 0),
        language: 'djfkadjfald',
        render: ({ i18n, currentMonth }: ChildProps) => (
          <h1 data-testid="date">{i18n.monthsFull[currentMonth]}</h1>
        ),
      })
    );

    expect(getByTestId('date')).toHaveTextContent('january');
  });

  it('uses the provided language prop if valid', () => {
    // allow the language to be overwritten
    Object.defineProperty(window.navigator, 'language', {
      value: 'es',
      writable: true,
    });

    const { getByTestId } = render(
      <Calendario
        language="en"
        startDate={new Date(2018, 0)}
        render={({ i18n, currentMonth }: ChildProps) => (
          <h1 data-testid="date">{i18n.monthsFull[currentMonth]}</h1>
        )}
      />
    );

    // Since the language was over written and then was passed as the language prop
    // getting january means that it used the prop, otherwise it returns something like M01
    expect(getByTestId('date')).toHaveTextContent('january');
  });
});
