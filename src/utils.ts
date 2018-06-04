import { CalendarioDate, FullCalendar } from './types';
import { Calendar } from 'calendar-base';

export function datesToCalendarioDates(
  initialSelectedDates: Date[] | CalendarioDate[]
): CalendarioDate[] {
  if ((initialSelectedDates as CalendarioDate[]).every(isCalendarioDate)) {
    return initialSelectedDates as CalendarioDate[];
  } else if ((initialSelectedDates as Date[]).every(isDateObject)) {
    return (initialSelectedDates as Date[]).map(convertDateToCalendario);
  } else return [];
}

export const convertDateToCalendario: (d: Date) => CalendarioDate = d => ({
  day: d.getDay(),
  month: d.getMonth(),
  year: d.getFullYear(),
  siblingMonth: false,
});

export const isDateObject: (date: CalendarioDate | Date) => boolean = date => {
  if ((date as Date).getUTCDate && typeof Date === 'object') return true;
  else return false;
};

export const isCalendarioDate: (
  date: CalendarioDate | Date
) => boolean = date => {
  if (
    (date as CalendarioDate).day != null &&
    (date as CalendarioDate).month != null &&
    (date as CalendarioDate).year != null &&
    (date as CalendarioDate).siblingMonth != null
  )
    return true;
  else return false;
};

export const createCalendar: (
  startDate: CalendarioDate | Date | undefined
) => FullCalendar = startDate => {
  let date = new Date();

  if (startDate == null) {
    date = new Date();
  } else if (isCalendarioDate(startDate)) {
    const { year, month, day } = startDate as CalendarioDate;
    date = new Date(year, month, day);
  } else if (isDateObject(startDate)) {
    date = startDate as Date;
  }

  return createFullCalendar(date);
};

function calendarInWeeks(cal: CalendarioDate[]): Array<CalendarioDate[]> {
  const numOfWeeks = cal.length / 7 - 1;
  let calendarWithWeeks = [];

  for (let currentWeek = 0; currentWeek <= numOfWeeks; currentWeek++) {
    const start = currentWeek == 0 ? 0 : currentWeek * 7;
    const end = start + 7;
    calendarWithWeeks.push(cal.slice(start, end));
  }

  return calendarWithWeeks;
}

function calendarFactory(
  calendar: Object
): (date: Date) => Array<CalendarioDate[]> {
  return date =>
    calendarInWeeks(
      (calendar as any).getCalendar(
        date.getFullYear(),
        date.getMonth(),
        date.getDay()
      )
    );
}

const makeCalendar = calendarFactory(
  new Calendar({ siblingMonths: true, weekStart: 0 })
);

function createFullCalendar(date: Date): FullCalendar {
  return {
    dates: makeCalendar(date),
    previousMonth: date.getMonth() - 1,
    currentMonth: date.getMonth(),
    nextMonth: date.getMonth() + 1,
    currentYear: date.getFullYear(),
  };
}
