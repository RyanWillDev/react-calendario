# React Calendario

A flexible and highly customizable primitive React component written in Typescript that provides the base calendar functionality for creating internationalized calendars or date pickers using the render prop pattern.

<hr />

## The Problem

You need to create a calendar or date picker with a custom look and feel and multi-language support.

## This Solution

This component provides the logic for generating and manipulating dates for a calendar or a date picker while allowing you to have full control over the UI. It uses the [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) API to provide multi-language support for weekdays and months. It also takes advantage of the flexiblility provided by the [Render Prop Pattern](https://reactjs.org/docs/render-props.html) so you can decide exactly how your calendar or date picker should look.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Live Examples](#live-examples)
- [Types](#types)
  - [CalendarioDate](#calendariodate)
  - [i18n](#i18n)
  - [FullCalendar](#fullcalendar)
- [Props](#props)
  - [Component Props](#component-props)
    - [startDate](#startdate)
    - [language](#language)
    - [render](#render)
  - [Render Function Props](#render-function-props)
    - [previousMonth](#previousmonth)
    - [currentMonth](#currentmonth)
    - [nextMonth](#nextmonth)
    - [currentYear](#currentyear)
    - [dates](#dates)
    - [i18n](#i18n)
    - [incrementMonth](#incrementmonth)
    - [decrementMonth](#decrementmonth)
    - [convertToNativeDate](#converttonativedate)
- [Inspiration](#inspiration)
  - [downshift](https://github.com/paypal/downshift)
- [Other Solutions](#other-solutions)

<hr />

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/en/) and should be installed as one of your project's `dependencies`:

`npm install --save @ryanwilldev/react-calendario`

> This package also depends on `react`. Please make sure you have it installed as well.

## Usage

## Types

## CalendarioDate

```
interface CalendarioDate {
  day: number;
  month: number;
  year: number;
  siblingMonth: boolean;
}
```

Represents a date in the calendar used by the component.
The `siblingMonth` prop is `true` when a day in the first or last week of the month falls in a the previous or next month.

## i18n

```
interface i18n {
  weekDaysFull: String[];
  weekDaysShort: String[];
  weekDaysNarrow: String[];
  monthsFull: String[];
  monthsShort: String[];
}
```

i18n is a abbreviation for internationalization.
This is passed to the child of Calendario to display internationalized month and weekday names.

## FullCalendar

```
interface FullCalendar {
  dates: Array<CalendarioDate[]>;
  previousMonth: number;
  currentMonth: number;
  nextMonth: number;
  currentYear: number;
  i18n: i18n;
}
```

The full reprensentation of the calendar for the current month.

## Props

## Component Props

The props passed to the Calendario component. All component props are optional.

## startDate

> `CalendarioDate` | `Date` | defaults to `undefined`

The date to create the month from. The created calendar wil include all the days in the month that the `startDate` falls in.

## render

> `Function` | defaults to `undefined`

A function that returns JSX for Calendario to render.

## language

> `string` | defaults to `undefined`

A supported browser [language code](https://www.metamodpro.com/browser-language-codes).
If no `language` prop is passed the browser's current language will be used.

## Render Function Props

The props passed to the [renderProp](https://reactjs.org/docs/render-props.html) that is given to Calendario either as a prop named `render` or as a child funciton to the `Calendario` component.

## previousMonth

> `number`

A zero indexed number for the month previous to the current month.

## currentMonth

> `number`

A zero indexed number for the current month.

## previousMonth

> `number`

A zero indexed number for the month after the current month.

## currentYear

> `number`

The current year for the calendar.

## dates

> `Array<Array<CalendarioDate>>

A nested array of `CalendarioDate`.
Each inner array represents one week of the current month.

```
[
  [
    { day: 1, month: 1, year: 2018, siblingMonth: false },
    ...
  ]
]
```

## i18n

```
{
  weekDaysFull: String[],
  weekDaysShort: String[],
  weekDaysNarrow: String[],
  monthsFull: String[],
  monthsShort: String[],
}
```

i18n is a abbreviation for internationalization.
This object contains arrays of internationalized weekday and month names than can
be used to display the months and weekdays in any language supported by the browser.

## incrementMonth

> `() => void`

This function should be placed on any button in your template that need to increment the current month by one.

## decrementMonth

> `() => void`

This function should be placed on any button in your template that need to decrement the current month by one.

## convertToNativeDate

> `(d: CalendarioDate) => Date | undefined`

A function to convert the `CalendarioDates` to the native `Date` object.
If `convertToNativeDate` is not given a `CalendarioDate` to convert it will return `undefined` and log an error to the console.

## Inspiration

The idea for using the render prop pattern to provide a flexible primitive component was inspired by [downshift](https://github.com/paypal/downshift)

## Other Solutions

[react-calendar](https://github.com/wojtekmaj/react-calendar)
