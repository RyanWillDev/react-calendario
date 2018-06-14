export interface CalendarioProps {
  startDate?: Date | CalendarioDate;
  render?: ChildFunction;
  language?: string;
  children?: ChildFunction;
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

export interface i18n {
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
  i18n: i18n;
}

export interface ChildProps {
  previousMonth: number;
  currentMonth: number;
  nextMonth: number;
  currentYear: number;
  dates: Array<CalendarioDate[]>;
  i18n: i18n;
  incrementMonth: () => void;
  decrementMonth: () => void;
  convertToNativeDate: (d: CalendarioDate) => Date | undefined;
}

export type ChildFunction = (props: ChildProps) => React.ReactNode;
