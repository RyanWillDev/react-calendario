import * as React from 'react';
import { CalendarioDate, FullCalendar, ChildProps } from './types';
import { datesToCalendarioDates, createCalendar } from './utils';

interface Props {
  initialSelectedDates?: Date[] | CalendarioDate[];
  startDate?: Date | CalendarioDate;
  multiSelect?: boolean;
  readOnly?: boolean;
  render?: Function;
  onDateSelected?: (selectedDates: CalendarioDate[]) => void;
}

interface State {
  selectedDates: Array<CalendarioDate>;
  calendar: FullCalendar;
}

export default class Calendario extends React.Component<Props, State> {
  state: State = {
    selectedDates: this.props.initialSelectedDates
      ? datesToCalendarioDates(this.props.initialSelectedDates)
      : [],
    calendar: createCalendar(this.props.startDate),
  };

  incrementMonth: () => void;
  decrementMonth: () => void;

  constructor(props: Props) {
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
      ...this.state.calendar,
      dates: [...this.state.calendar.dates],
    };
  }

  changeMonth(num: number) {
    const { currentYear, currentMonth } = this.state.calendar;
    let year: number;

    if (num === -1 && currentMonth === 0) year = currentYear - 1;
    else if (num === 1 && currentMonth === 11) year = currentYear + 1;
    else year = currentYear;

    this.setState({
      calendar: createCalendar({
        month: currentMonth + num,
        year,
        day: 1,
        siblingMonth: false,
      }),
    });
  }
}
