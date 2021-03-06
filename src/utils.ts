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

// Helper function for determining if an object is a Date.
const isDateObject: (
  date: CalendarioDate | Date | undefined
) => boolean = date => {
  return (
    date !== undefined && (date as Date).getUTCDate && typeof date === 'object'
  );
};

// Helper function for determining if an object is a CalendarioDate
const isCalendarioDate: (
  date: CalendarioDate | Date | undefined
) => boolean = date => {
  return (
    date !== undefined &&
    (date as CalendarioDate).day != null &&
    (date as CalendarioDate).month != null &&
    (date as CalendarioDate).year != null &&
    (date as CalendarioDate).siblingMonth != null &&
    (date as CalendarioDate).value != null
  );
};

/**
 * Helper function for converting a CalendarioDate to a native Date object.
 *
 * @param date
 */
export const convertToNativeDate: (
  date: CalendarioDate | any
) => Date | undefined = date => {
  if (isCalendarioDate(date)) {
    const { year, month, day } = date as CalendarioDate;
    return new Date(year, month, day);
  } else {
    console.error(
      'convertToNativeDate expected a CalendarioDate, but got ' + date
    );
  }
};

/**
 * Helper function for formatting the calendar returned from calendar-base
 * into weeks.
 *
 * The formatted calendar will be a nested array of CalendarioDates.
 * Each nested array represents a week of the month.
 *
 */
function calendarInWeeks(
  cal: CalendarioDate[],
  language: string | undefined
): Array<CalendarioDate[]> {
  const dateFormatter = formatDate(language)({ day: 'numeric' });

  const completeCalendar = cal
    .map(d => (d.siblingMonth ? d : { ...d, siblingMonth: false }))
    .map(d => ({
      ...d,
      value: dateFormatter(new Date(d.year, d.month, d.day)),
    }));

  const numOfWeeks = completeCalendar.length / 7 - 1;
  let calendarWithWeeks = [];

  for (let currentWeek = 0; currentWeek <= numOfWeeks; currentWeek++) {
    const start = currentWeek == 0 ? 0 : currentWeek * 7;
    const end = start + 7;
    calendarWithWeeks.push(completeCalendar.slice(start, end));
  }

  return calendarWithWeeks;
}

/**
 * Helper function for injected the Calendar object from calendar base.
 *
 * Returns a function used to create and format a calendar based on a given date.
 *
 */
function calendarFactory(
  calendar: Object
): (date: Date, props: CalendarioProps) => Array<CalendarioDate[]> {
  return (date, { language }) =>
    calendarInWeeks(
      (calendar as any).getCalendar(
        date.getFullYear(),
        date.getMonth(),
        date.getDay()
      ),
      language
    );
}

/**
 * Creates and formats a calendar based on a given date.
 */
const makeCalendar = calendarFactory(
  new Calendar({ siblingMonths: true, weekStart: 0 })
);

/**
 *  Creates a formatted calendar from the startDate prop if given else from the
 *  current date.
 *
 *  startDate can be given as a CalendarioDate or a native Date object.
 */
export const createCalendar: (
  props: CalendarioProps
) => FullCalendar = props => {
  let date: Date;
  const { startDate } = props;

  if (isCalendarioDate(startDate)) {
    const { year, month, day } = startDate as CalendarioDate;
    date = new Date(year, month, day);
  } else if (isDateObject(startDate)) {
    date = startDate as Date;
  } else {
    date = new Date();
  }

  return createFullCalendar(date, props);
};

/**
 * Function to create the FullCalendar used by Calendario
 */
function createFullCalendar(date: Date, props: CalendarioProps): FullCalendar {
  const { language } = props;
  return {
    dates: makeCalendar(date, props),
    previousMonth: date.getMonth() > 0 ? date.getMonth() - 1 : 11,
    currentMonth: date.getMonth(),
    nextMonth: date.getMonth() < 11 ? date.getMonth() + 1 : 0,
    currentYear: date.getFullYear(),
    i18n: createI18nDates(language),
  };
}

/**
 * Helper function for creating a date formatter for i18n dates.
 *
 * @param langIsSupported
 * @param lang
 */
function formatDate(lang: string | undefined): (o: {}) => (d: Date) => string {
  const langIsSupported =
    lang !== undefined &&
    lang.length > 0 &&
    lang.length < 8 && // any string longer than 8 will throw an error in the following check
    Intl.DateTimeFormat.supportedLocalesOf(lang).length > 0;

  !langIsSupported &&
    lang !== undefined &&
    console.error(
      `Provided language ${lang} is not supported. Using browser's language.`
    );

  return options => date =>
    new Intl.DateTimeFormat(
      langIsSupported ? lang : navigator.language,
      options
    ).format(date);
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
  const dateFormatter = formatDate(language);

  const weekDaysShort = i18nWeekDays.map(
    dateFormatter({
      weekday: 'short',
    })
  );

  const weekDaysNarrow = i18nWeekDays.map(
    dateFormatter({
      weekday: 'narrow',
    })
  );

  const weekDaysFull = i18nWeekDays.map(
    dateFormatter({
      weekday: 'long',
    })
  );

  const monthsShort = i18nMonths.map(
    dateFormatter({
      month: 'short',
    })
  );

  const monthsFull = i18nMonths.map(
    dateFormatter({
      month: 'long',
    })
  );

  return {
    monthsFull,
    monthsShort,
    weekDaysFull,
    weekDaysShort,
    weekDaysNarrow,
  };
}
