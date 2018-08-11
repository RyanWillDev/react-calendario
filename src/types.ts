export interface CalendarioProps {
  children?: ChildFunction;
  language?: string;
  render?: ChildFunction;
  startDate?: Date | CalendarioDate;
}

export interface CalendarioState {
  calendar: FullCalendar;
}

export interface CalendarioDate {
  day: number;
  month: number;
  siblingMonth: boolean;
  value: string;
  year: number;
}

export interface i18n {
  monthsFull: string[];
  monthsShort: string[];
  weekDaysFull: string[];
  weekDaysNarrow: string[];
  weekDaysShort: string[];
}

export interface FullCalendar {
  currentMonth: number;
  currentYear: number;
  dates: Array<CalendarioDate[]>;
  i18n: i18n;
  nextMonth: number;
  previousMonth: number;
}

export interface ChildProps {
  convertToNativeDate: (d: CalendarioDate) => Date | undefined;
  currentMonth: number;
  currentYear: number;
  dates: Array<CalendarioDate[]>;
  decrementMonth: () => void;
  i18n: i18n;
  incrementMonth: () => void;
  nextMonth: number;
  previousMonth: number;
}

export type ChildFunction = (props: ChildProps) => React.ReactNode;
