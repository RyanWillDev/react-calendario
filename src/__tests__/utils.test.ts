import { convertToNativeDate } from '../utils';

describe('convertToNativeDate', () => {
  it('returns a native date when given a CalendarioDate', () => {
    const calendarioDate = {
      day: 1,
      month: 0,
      year: 2018,
      value: '',
      siblingMonth: false,
    };

    const nativeDate = convertToNativeDate(calendarioDate);

    expect((nativeDate as Date).getDay()).toEqual(1);
  });

  it('returns undefined when something other than a CalendarioDate is given', () => {
    // Set console.error to no-op to avoid printing error in test environment
    console.error = () => {};
    expect(convertToNativeDate('blah')).toBe(undefined);
  });
});
