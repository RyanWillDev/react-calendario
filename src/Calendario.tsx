import * as React from 'react';
import { ChildProps, CalendarioProps, CalendarioState } from './types';
import { createCalendar, convertToNativeDate } from './utils';

export default class Calendario extends React.Component<
  CalendarioProps,
  CalendarioState
> {
  state: CalendarioState = {
    calendar: createCalendar(this.props),
  };

  incrementMonth: () => void;
  decrementMonth: () => void;

  constructor(props: CalendarioProps) {
    super(props);

    this.incrementMonth = this.changeMonth.bind(this, 1);
    this.decrementMonth = this.changeMonth.bind(this, -1);
  }

  render() {
    if (this.props.render && typeof this.props.render === 'function')
      return this.props.render(this.createChildProps());
    else if (this.props.children && typeof this.props.children === 'function')
      return (this.props.children as Function)(this.createChildProps());
    else
      console.error(
        `React Calendario must receive a component to render.
        Either pass a function as a render prop or as the child to React Calendario.`
      );

    return null;
  }

  createChildProps(): ChildProps {
    return {
      incrementMonth: () => this.incrementMonth(),
      decrementMonth: () => this.decrementMonth(),
      convertToNativeDate: d => convertToNativeDate(d),
      ...this.state.calendar,
      dates: [...this.state.calendar.dates],
    };
  }

  changeMonth(num: number) {
    const { currentYear, currentMonth } = this.state.calendar;
    let year: number, month: number;

    if (num === -1 && currentMonth === 0) {
      year = currentYear - 1;
      month = 11;
    } else if (num === 1 && currentMonth === 11) {
      year = currentYear + 1;
      month = 0;
    } else {
      year = currentYear;
      month = currentMonth + num;
    }

    this.setState({
      calendar: createCalendar({
        startDate: {
          month,
          year,
          day: 1,
          siblingMonth: false,
        },
        language: this.props.language,
      }),
    });
  }
}
