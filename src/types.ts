export interface CalendarioDate {
  day: number;
  month: number;
  year: number;
  siblingMonth: boolean;
}

export interface FullCalendar {
  dates: Array<CalendarioDate[]>;
  previousMonth: number;
  currentMonth: number;
  nextMonth: number;
  currentYear: number;
}

export interface ChildProps {
  previousMonth: number;
  currentMonth: number;
  nextMonth: number;
  currentYear: number;
  dates: Array<CalendarioDate[]>;
  incrementMonth: () => void;
  decrementMonth: () => void;
}
