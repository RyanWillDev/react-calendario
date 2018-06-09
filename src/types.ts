export interface CalendarioProps {
  initialSelectedDates?: Date[] | CalendarioDate[];
  startDate?: Date | CalendarioDate;
  multiSelect?: boolean;
  readOnly?: boolean;
  render?: Function;
  language?: string;
  onDateSelected?: (selectedDates: CalendarioDate[]) => void;
}

export interface CalendarioState {
  selectedDates: Array<CalendarioDate>;
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
}
