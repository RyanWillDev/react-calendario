export interface CalendarioProps {
  startDate?: Date | CalendarioDate;
  render?: Function;
  language?: string;
}

export interface CalendarioState {
  calendar: FullCalendar;
}

export interface CalendarioDate {
  day: number;
  month: number;
  year: number;
  siblingMonth: boolean;
}

export interface IntlDates {
  weekDaysFull: String[];
  weekDaysShort: String[];
  weekDaysNarrow: String[];
  monthsFull: String[];
  monthsShort: String[];
}

export interface FullCalendar {
  dates: Array<CalendarioDate[]>;
  previousMonth: number;
  currentMonth: number;
  nextMonth: number;
  currentYear: number;
  i18nDates: IntlDates;
}

export interface ChildProps {
  previousMonth: number;
  currentMonth: number;
  nextMonth: number;
  currentYear: number;
  dates: Array<CalendarioDate[]>;
  i18nDates: IntlDates;
  incrementMonth: () => void;
  decrementMonth: () => void;
  convertToNativeDate: (d: CalendarioDate) => Date | undefined;
}
