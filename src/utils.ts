import { CalendarioDate, CalendarioProps, FullCalendar } from './types';
import { Calendar } from 'calendar-base';

// Constants used to generate internationalized weekdays
const i18nWeekDays = [
  new Date(2018, 0, 7),
  new Date(2018, 0, 8),
  new Date(2018, 0, 9),
  new Date(2018, 0, 10),
  new Date(2018, 0, 11),
  new Date(2018, 0, 12),
  new Date(2018, 0, 13),
];

// Constants used to generate internationalized months
const i18nMonths = [
  new Date(2018, 0),
  new Date(2018, 1),
  new Date(2018, 2),
  new Date(2018, 3),
  new Date(2018, 4),
  new Date(2018, 5),
  new Date(2018, 6),
  new Date(2018, 7),
  new Date(2018, 8),
  new Date(2018, 9),
  new Date(2018, 10),
  new Date(2018, 11),
];

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
  if ((date as Date).getUTCDate && typeof date === 'object') return true;
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

export const createCalendar: (props: CalendarioProps) => FullCalendar = ({
  startDate,
  language,
}) => {
  let date = new Date();

  if (startDate == null) {
    date = new Date();
  } else if (isCalendarioDate(startDate)) {
    const { year, month, day } = startDate as CalendarioDate;
    date = new Date(year, month, day);
  } else if (isDateObject(startDate)) {
    date = startDate as Date;
  }

  return createFullCalendar(date, language);
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

function createFullCalendar(
  date: Date,
  language: string | undefined
): FullCalendar {
  return {
    dates: makeCalendar(date),
    previousMonth: date.getMonth() - 1,
    currentMonth: date.getMonth(),
    nextMonth: date.getMonth() + 1,
    currentYear: date.getFullYear(),
    i18nDates: createI18nDates(language),
  };
}

/**
 * createI18nDates
 *
 * Create internationalized strings of months and weekdays based on the language
 * prop passed to Calendario. If no language prop was passed, the browser's language
 * will be used instead.
 *
 * @param language string | undefined
 */

function createI18nDates(language: string | undefined) {
  const langIsSupported =
    language !== undefined &&
    language.length > 0 &&
    Intl.DateTimeFormat.supportedLocalesOf(language).length > 0;

  const weekDaysShort = i18nWeekDays.map(d =>
    new Intl.DateTimeFormat(langIsSupported ? language : navigator.language, {
      weekday: 'short',
    }).format(d)
  );

  const weekDaysNarrow = i18nWeekDays.map(d =>
    new Intl.DateTimeFormat(langIsSupported ? language : navigator.language, {
      weekday: 'narrow',
    }).format(d)
  );

  const weekDaysFull = i18nWeekDays.map(d =>
    new Intl.DateTimeFormat(langIsSupported ? language : navigator.language, {
      weekday: 'long',
    }).format(d)
  );

  const monthsShort = i18nMonths.map(d =>
    new Intl.DateTimeFormat(langIsSupported ? language : navigator.language, {
      month: 'short',
    }).format(d)
  );

  const monthsFull = i18nMonths.map(d =>
    new Intl.DateTimeFormat(langIsSupported ? language : navigator.language, {
      month: 'long',
    }).format(d)
  );

  return {
    monthsFull,
    monthsShort,
    weekDaysFull,
    weekDaysShort,
    weekDaysNarrow,
  };
}
