import { DateRange, DateRangePreset } from "./types";
import { CalendarTokenType } from "./dateRangePicker.tokens";

/**
 * Formats a date according to the specified format
 * @param date The date to format
 * @param format The format string (e.g., "dd/MM/yyyy")
 * @returns The formatted date string or empty string if date is invalid
 */
export const formatDate = (date: Date, format: string): string => {
  if (!date || !isValidDate(date)) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return format
    .replace("dd", day)
    .replace("MM", month)
    .replace("yyyy", year.toString())
    .replace("HH", hours)
    .replace("mm", minutes);
};

/**
 * Parses a date string according to the specified format
 * @param dateString The date string to parse
 * @param format The format string
 * @returns The parsed date or null if invalid
 */
export const parseDate = (dateString: string, format: string): Date | null => {
  try {
    const formatParts = format.split(/[^a-zA-Z]/);
    const dateParts = dateString.split(/[^0-9]/);

    if (formatParts.length !== dateParts.length) return null;

    let day = 1,
      month = 1,
      year = new Date().getFullYear(),
      hours = 0;
    const minutes = 0;

    formatParts.forEach((part, index) => {
      const value = parseInt(dateParts[index]);
      if (isNaN(value)) return null;

      switch (part.toLowerCase()) {
        case "dd":
          day = value;
          break;
        case "mm":
          month = value;
          break;
        case "yyyy":
          year = value;
          break;
        case "hh":
          hours = value;
          break;
        default:
          break;
      }
    });

    const date = new Date(year, month - 1, day, hours, minutes);
    return isValidDate(date) ? date : null;
  } catch {
    return null;
  }
};

/**
 * Checks if a date is valid
 * @param date The date to check
 * @returns True if the date is valid
 */
export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Formats time in 12-hour format
 * @param date The date to format
 * @returns The formatted time string
 */
export const formatTimeIn12Hour = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

/**
 * Formats a date range for display
 * @param range The date range to format
 * @param showTime Whether to include time in the formatted string
 * @returns The formatted date range string
 */
export const formatDateRange = (
  range: DateRange,
  showTime: boolean = false,
): string => {
  if (!range.startDate) {
    return "";
  }

  const startFormat = showTime ? "dd/MM/yyyy, HH:mm" : "dd/MM/yyyy";
  const endFormat = showTime ? "dd/MM/yyyy, HH:mm" : "dd/MM/yyyy";

  const start = formatDate(range.startDate, startFormat);

  if (!range.endDate) {
    return start;
  }

  const end = formatDate(range.endDate, endFormat);
  return `${start} – ${end}`;
};

/**
 * Gets a date range based on a preset
 * @param preset The preset to get the range for
 * @returns The date range for the preset
 */
export const getPresetDateRange = (preset: DateRangePreset): DateRange => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (preset) {
    case DateRangePreset.TODAY: {
      return { startDate: today, endDate: today };
    }

    case DateRangePreset.YESTERDAY: {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return { startDate: yesterday, endDate: yesterday };
    }

    case DateRangePreset.TOMORROW: {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return { startDate: tomorrow, endDate: tomorrow };
    }

    case DateRangePreset.LAST_1_HOUR: {
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      return { startDate: oneHourAgo, endDate: now };
    }

    case DateRangePreset.LAST_6_HOURS: {
      const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
      return { startDate: sixHoursAgo, endDate: now };
    }

    case DateRangePreset.LAST_7_DAYS: {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      return { startDate: sevenDaysAgo, endDate: today };
    }

    case DateRangePreset.LAST_30_DAYS: {
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
      return { startDate: thirtyDaysAgo, endDate: today };
    }

    case DateRangePreset.LAST_3_MONTHS: {
      const threeMonthsAgo = new Date(today);
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return { startDate: threeMonthsAgo, endDate: today };
    }

    case DateRangePreset.LAST_12_MONTHS: {
      const twelveMonthsAgo = new Date(today);
      twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
      return { startDate: twelveMonthsAgo, endDate: today };
    }

    case DateRangePreset.NEXT_7_DAYS: {
      const sevenDaysLater = new Date(today);
      sevenDaysLater.setDate(sevenDaysLater.getDate() + 6);
      return { startDate: today, endDate: sevenDaysLater };
    }

    case DateRangePreset.NEXT_30_DAYS: {
      const thirtyDaysLater = new Date(today);
      thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 29);
      return { startDate: today, endDate: thirtyDaysLater };
    }

    case DateRangePreset.NEXT_3_MONTHS: {
      const threeMonthsLater = new Date(today);
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
      return { startDate: today, endDate: threeMonthsLater };
    }

    case DateRangePreset.NEXT_12_MONTHS: {
      const twelveMonthsLater = new Date(today);
      twelveMonthsLater.setFullYear(twelveMonthsLater.getFullYear() + 1);
      return { startDate: today, endDate: twelveMonthsLater };
    }

    default: {
      return { startDate: today, endDate: today };
    }
  }
};

/**
 * Gets a label for a preset
 * @param preset The preset to get the label for
 * @returns The label for the preset
 */
export const getPresetLabel = (preset: DateRangePreset): string => {
  switch (preset) {
    case DateRangePreset.TODAY:
      return "Today";
    case DateRangePreset.YESTERDAY:
      return "Yesterday";
    case DateRangePreset.TOMORROW:
      return "Tomorrow";
    case DateRangePreset.LAST_1_HOUR:
      return "Last 1 hour";
    case DateRangePreset.LAST_6_HOURS:
      return "Last 6 hours";
    case DateRangePreset.LAST_7_DAYS:
      return "Last 7 days";
    case DateRangePreset.LAST_30_DAYS:
      return "Last 30 days";
    case DateRangePreset.LAST_3_MONTHS:
      return "Last 3 months";
    case DateRangePreset.LAST_12_MONTHS:
      return "Last 12 months";
    case DateRangePreset.NEXT_7_DAYS:
      return "Next 7 days";
    case DateRangePreset.NEXT_30_DAYS:
      return "Next 30 days";
    case DateRangePreset.NEXT_3_MONTHS:
      return "Next 3 months";
    case DateRangePreset.NEXT_12_MONTHS:
      return "Next 12 months";
    case DateRangePreset.CUSTOM:
      return "Custom";
    default:
      return "Select Range";
  }
};

/**
 * Formats time string to HH:MM format
 * @param time The time string to format
 * @returns The formatted time string
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours) || 0;
  const m = parseInt(minutes) || 0;

  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

/**
 * Validates a time string
 * @param time The time string to validate
 * @returns True if the time is valid
 */
export const isValidTime = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Converts a date to string with optional time
 * @param date The date to convert
 * @param includeTime Whether to include time
 * @param timeFormat The time format to use
 * @returns The formatted date string
 */
export const dateToString = (
  date: Date,
  includeTime?: boolean,
  timeFormat?: string,
): string => {
  const dateStr = formatDate(date, "dd/MM/yyyy");

  if (includeTime && timeFormat) {
    const timeStr = formatDate(date, timeFormat);
    return `${dateStr} ${timeStr}`;
  }

  return dateStr;
};

/**
 * Checks if two dates are the same day
 * @param date1 First date
 * @param date2 Second date
 * @returns True if dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Checks if a date is within a range
 * @param date The date to check
 * @param startDate Range start date
 * @param endDate Range end date
 * @returns True if date is in range
 */
export const isDateInRange = (
  date: Date,
  startDate: Date,
  endDate: Date,
): boolean => {
  const dateTime = date.getTime();
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  return dateTime >= startTime && dateTime <= endTime;
};

/**
 * Gets the number of days in a month
 * @param year The year
 * @param month The month (0-based)
 * @returns The number of days in the month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Gets the first day of the month (0 = Sunday)
 * @param year The year
 * @param month The month (0-based)
 * @returns The day of the week (0-6)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

/**
 * Generates a calendar grid for a month
 * @param year The year
 * @param month The month (0-based)
 * @returns Array of weeks, each containing day numbers or null for empty cells
 */
export const generateCalendarGrid = (
  year: number,
  month: number,
): (number | null)[][] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  while (currentWeek.length > 0 && currentWeek.length < 7) {
    currentWeek.push(null);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
};

/**
 * Checks if a date is the start date of a range
 * @param date The date to check
 * @param selectedRange The selected date range
 * @returns True if the date is the start date
 */
export const isStartDate = (date: Date, selectedRange: DateRange): boolean => {
  if (!selectedRange.startDate) return false;
  return (
    date.getDate() === selectedRange.startDate.getDate() &&
    date.getMonth() === selectedRange.startDate.getMonth() &&
    date.getFullYear() === selectedRange.startDate.getFullYear()
  );
};

/**
 * Checks if a date is the end date of a range
 * @param date The date to check
 * @param selectedRange The selected date range
 * @returns True if the date is the end date
 */
export const isEndDate = (date: Date, selectedRange: DateRange): boolean => {
  if (!selectedRange.endDate) return false;
  return (
    date.getDate() === selectedRange.endDate.getDate() &&
    date.getMonth() === selectedRange.endDate.getMonth() &&
    date.getFullYear() === selectedRange.endDate.getFullYear()
  );
};

/**
 * Checks if a date is within a selected range (not including start/end)
 * @param date The date to check
 * @param selectedRange The selected date range
 * @returns True if the date is in the range
 */
export const isInSelectedRange = (
  date: Date,
  selectedRange: DateRange,
): boolean => {
  if (!selectedRange.startDate || !selectedRange.endDate) return false;
  return date > selectedRange.startDate && date < selectedRange.endDate;
};

/**
 * Checks if a date is today
 * @param date The date to check
 * @param today Today's date
 * @returns True if the date is today
 */
export const isDateToday = (date: Date, today: Date): boolean => {
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Handles date click logic for calendar
 * @param clickedDate The date that was clicked
 * @param selectedRange Current selected range
 * @param allowSingleDateSelection Whether single date selection is allowed
 * @param today Today's date for validation
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @param isDoubleClick Whether this is a double-click event
 * @returns New date range or null if click should be ignored
 */
export const handleCalendarDateClick = (
  clickedDate: Date,
  selectedRange: DateRange,
  allowSingleDateSelection: boolean = false,
  today: Date,
  disableFutureDates: boolean = false,
  disablePastDates: boolean = false,
  isDoubleClick: boolean = false,
): DateRange | null => {
  if (
    (disableFutureDates && clickedDate > today) ||
    (disablePastDates && clickedDate < today)
  ) {
    return null;
  }

  let newRange: DateRange;

  if (isDoubleClick) {
    if (allowSingleDateSelection) {
      newRange = {
        startDate: clickedDate,
        endDate: clickedDate,
      };
    } else {
      newRange = {
        startDate: clickedDate,
        endDate: clickedDate,
      };
    }
    return newRange;
  }

  if (!selectedRange.startDate || allowSingleDateSelection) {
    newRange = {
      startDate: clickedDate,
      endDate: clickedDate,
    };
  } else if (!selectedRange.endDate) {
    if (clickedDate < selectedRange.startDate) {
      newRange = {
        startDate: clickedDate,
        endDate: clickedDate,
      };
    } else if (clickedDate.getTime() === selectedRange.startDate.getTime()) {
      newRange = {
        startDate: clickedDate,
        endDate: clickedDate,
      };
    } else {
      newRange = {
        startDate: selectedRange.startDate,
        endDate: clickedDate,
      };
    }
  } else {
    const startTime = selectedRange.startDate.getTime();
    const endTime = selectedRange.endDate.getTime();
    const clickedTime = clickedDate.getTime();

    const distanceToStart = Math.abs(clickedTime - startTime);
    const distanceToEnd = Math.abs(clickedTime - endTime);

    if (distanceToStart <= distanceToEnd) {
      if (clickedDate <= selectedRange.endDate) {
        newRange = {
          startDate: clickedDate,
          endDate: selectedRange.endDate,
        };
      } else {
        newRange = {
          startDate: selectedRange.endDate,
          endDate: clickedDate,
        };
      }
    } else {
      if (clickedDate >= selectedRange.startDate) {
        newRange = {
          startDate: selectedRange.startDate,
          endDate: clickedDate,
        };
      } else {
        newRange = {
          startDate: clickedDate,
          endDate: selectedRange.startDate,
        };
      }
    }
  }

  return newRange;
};

/**
 * Generates calendar weeks for a specific month with consistent alignment
 * @param year The year
 * @param month The month (0-based)
 * @returns Array of weeks with day numbers or null for empty cells
 */
export const generateMonthWeeks = (
  year: number,
  month: number,
): (number | null)[][] => {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const firstDayOfWeek = 2;
  const weeks = [];
  let week = Array(7).fill(null);
  let dayCounter = 1;

  for (let i = firstDayOfWeek; i < 7 && dayCounter <= daysInMonth; i++) {
    week[i] = dayCounter++;
  }
  weeks.push(week);

  while (dayCounter <= daysInMonth) {
    week = Array(7).fill(null);
    for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
      week[i] = dayCounter++;
    }
    weeks.push(week);
  }

  return weeks;
};

/**
 * Generates the list of months to display in calendar
 * @param startYear Starting year
 * @param startMonth Starting month (0-based)
 * @param endYear Ending year
 * @returns Array of month/year objects
 */
export const generateCalendarMonths = (
  startYear: number = 2012,
  startMonth: number = 0,
  endYear?: number,
): { month: number; year: number }[] => {
  const months = [];
  const currentDate = new Date();
  const finalEndYear = endYear || currentDate.getFullYear() + 5;

  for (let year = startYear; year <= finalEndYear; year++) {
    const monthStart = year === startYear ? startMonth : 0;
    for (let month = monthStart; month <= 11; month++) {
      months.push({ month, year });
    }
  }

  return months;
};

/**
 * Generates initial months around current date (4-5 months)
 * @param today Current date
 * @returns Array of initial months to display
 */
export const generateInitialMonths = (
  today: Date,
): { month: number; year: number }[] => {
  const months = [];
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  for (let i = -2; i <= 2; i++) {
    const date = new Date(currentYear, currentMonth + i, 1);
    months.push({
      month: date.getMonth(),
      year: date.getFullYear(),
    });
  }

  return months;
};

/**
 * Generates a chunk of months for progressive loading
 * @param startYear Starting year
 * @param startMonth Starting month (0-based)
 * @param endYear Ending year for this chunk
 * @param endMonth Ending month for this chunk (0-based)
 * @returns Array of months for the chunk
 */
export const generateMonthChunk = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number = 11,
): { month: number; year: number }[] => {
  const months = [];

  for (let year = startYear; year <= endYear; year++) {
    const monthStart = year === startYear ? startMonth : 0;
    const monthEnd = year === endYear ? endMonth : 11;

    for (let month = monthStart; month <= monthEnd; month++) {
      months.push({ month, year });
    }
  }

  return months;
};

/**
 * Calculates the next chunk to load based on current data
 * @param currentMonths Currently loaded months
 * @param direction Direction to load ('past' or 'future')
 * @returns Next chunk parameters or null if reached bounds
 */
export const getNextChunkParams = (
  currentMonths: { month: number; year: number }[],
  direction: "past" | "future",
): { startYear: number; startMonth: number } | null => {
  const MIN_YEAR = 2012;
  const MAX_YEAR = new Date().getFullYear() + 10;

  if (direction === "past") {
    const firstMonth = currentMonths[0];

    if (firstMonth.year <= MIN_YEAR && firstMonth.month === 0) {
      return null;
    }

    const targetYear = Math.max(MIN_YEAR, firstMonth.year - 3);
    return {
      startYear: targetYear,
      startMonth: targetYear === MIN_YEAR ? 0 : 0,
    };
  } else {
    const lastMonth = currentMonths[currentMonths.length - 1];

    if (lastMonth.year >= MAX_YEAR) {
      return null;
    }

    const nextMonth = lastMonth.month === 11 ? 0 : lastMonth.month + 1;
    const nextYear =
      lastMonth.month === 11 ? lastMonth.year + 1 : lastMonth.year;
    return { startYear: nextYear, startMonth: nextMonth };
  }
};

/**
 * Gets month name from month index
 * @param monthIndex Month index (0-based)
 * @returns Month name
 */
export const getMonthName = (monthIndex: number): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};

/**
 * Gets day names for calendar header
 * @returns Array of day names
 */
export const getDayNames = (): string[] => {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
};

/**
 * Calculates the height of a single month in the calendar
 * @returns Height in pixels
 */
export const getMonthHeight = (): number => {
  return 40 + 6 * 40;
};

/**
 * Calculates which months should be visible in the viewport
 * @param scrollTop Current scroll position
 * @param containerHeight Height of the scrollable container
 * @param months Array of all months
 * @param monthHeight Height of each month
 * @param buffer Number of months to render outside viewport for smooth scrolling
 * @returns Object with start/end indices and visible months
 */
export const getVisibleMonths = (
  scrollTop: number,
  containerHeight: number,
  months: { month: number; year: number }[],
  monthHeight: number,
  buffer: number = 12,
): {
  startIndex: number;
  endIndex: number;
  visibleMonths: { month: number; year: number; index: number }[];
  totalHeight: number;
} => {
  const totalHeight = months.length * monthHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / monthHeight) - buffer);
  const endIndex = Math.min(
    months.length - 1,
    Math.ceil((scrollTop + containerHeight) / monthHeight) + buffer,
  );

  const visibleMonths = months
    .slice(startIndex, endIndex + 1)
    .map((month, i) => ({
      ...month,
      index: startIndex + i,
    }));

  return {
    startIndex,
    endIndex,
    visibleMonths,
    totalHeight,
  };
};

/**
 * Throttle function to limit how often a function can be called
 * @param func Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Calculates the top offset for a month at a given index
 * @param index Month index
 * @param monthHeight Height of each month
 * @returns Top offset in pixels
 */
export const getMonthOffset = (index: number, monthHeight: number): number => {
  return index * monthHeight;
};

/**
 * Finds the month that contains today's date
 * @param months Array of months
 * @param today Today's date
 * @returns Index of the month containing today
 */
export const findCurrentMonthIndex = (
  months: { month: number; year: number }[],
  today: Date,
): number => {
  return months.findIndex(
    ({ month, year }) =>
      month === today.getMonth() && year === today.getFullYear(),
  );
};

/**
 * Scrolls to a specific month
 * @param monthIndex Index of the month to scroll to
 * @param monthHeight Height of each month
 * @returns Scroll position
 */
export const getScrollToMonth = (
  monthIndex: number,
  monthHeight: number,
): number => {
  return monthIndex * monthHeight;
};

/**
 * Gets all the states for a date cell
 * @param date The date to check
 * @param selectedRange Current selected range
 * @param today Today's date
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @returns Object with all date states
 */
export const getDateCellStates = (
  date: Date,
  selectedRange: DateRange,
  today: Date,
  disableFutureDates: boolean = false,
  disablePastDates: boolean = false,
) => {
  const isStart = isStartDate(date, selectedRange);
  const isEnd = isEndDate(date, selectedRange);
  const isRangeDay = isInSelectedRange(date, selectedRange);
  const isTodayDay = isDateToday(date, today);
  const isSingleDate = isStart && isEnd;
  const isDisabled = Boolean(
    (disableFutureDates && date > today) || (disablePastDates && date < today),
  );

  return {
    isStart,
    isEnd,
    isRangeDay,
    isTodayDay,
    isSingleDate,
    isDisabled,
  };
};

/**
 * Determines if a today indicator should be shown
 * @param dateStates Object containing all date states
 * @returns Boolean indicating if today indicator should be shown
 */
export const shouldShowTodayIndicator = (
  dateStates: ReturnType<typeof getDateCellStates>,
): boolean => {
  const { isTodayDay, isStart, isEnd, isRangeDay } = dateStates;
  return isTodayDay && !isStart && !isEnd && !isRangeDay;
};

/**
 * Validation result for date input
 */
export type DateValidationResult = {
  isValid: boolean;
  error: "none" | "format" | "invalid-date" | "out-of-range";
  message?: string;
};

/**
 * Interface for date range picker tokens used in styling functions
 */
export type DateRangePickerTokens = {
  calendar: {
    dayCell: Record<string, unknown>;
    singleDate: Record<string, unknown>;
    startDate: Record<string, unknown>;
    endDate: Record<string, unknown>;
    rangeDay: Record<string, unknown>;
    todayDay: Record<string, unknown>;
  };
  states: {
    disabledDay: Record<string, unknown>;
  };
  text: {
    selectedDay: {
      color?: string | unknown;
    };
    todayDay: {
      color?: string | unknown;
    };
    dayNumber: {
      color?: string | unknown;
    };
  };
};

/**
 * Validates date format and date values
 * @param value The input value to validate
 * @param format The expected format (e.g., 'dd/MM/yyyy')
 * @returns Validation result with specific error type
 */
export const validateDateInput = (
  value: string,
  format: string,
): DateValidationResult => {
  if (!value || value.length === 0) {
    return { isValid: true, error: "none" };
  }

  if (format === "dd/MM/yyyy") {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = value.match(dateRegex);

    if (!match) {
      return {
        isValid: false,
        error: "format",
        message: "Invalid date",
      };
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    if (year < 2001 || year > 2100) {
      return {
        isValid: false,
        error: "out-of-range",
        message: "Date not in range",
      };
    }

    if (month < 1 || month > 12) {
      return {
        isValid: false,
        error: "invalid-date",
        message: "Invalid date",
      };
    }

    if (day < 1 || day > 31) {
      return {
        isValid: false,
        error: "invalid-date",
        message: "Invalid date",
      };
    }

    const date = new Date(year, month - 1, day);
    const isValidCalendarDate =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    if (!isValidCalendarDate) {
      return {
        isValid: false,
        error: "invalid-date",
        message: "Invalid date",
      };
    }

    return { isValid: true, error: "none" };
  }

  return { isValid: true, error: "none" };
};

/**
 * Formats date input as user types, adding slashes automatically
 * @param value The input value to format
 * @param format The target format (e.g., 'dd/MM/yyyy')
 * @returns Formatted input value
 */
export const formatDateInput = (value: string, format: string): string => {
  if (format === "dd/MM/yyyy") {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length === 0) return "";
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4)
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    if (cleaned.length <= 8) {
      return (
        cleaned.slice(0, 2) +
        "/" +
        cleaned.slice(2, 4) +
        "/" +
        cleaned.slice(4, 8)
      );
    }

    return (
      cleaned.slice(0, 2) +
      "/" +
      cleaned.slice(2, 4) +
      "/" +
      cleaned.slice(4, 8)
    );
  }

  return value;
};

/**
 * Checks if date input is complete (full format length)
 * @param value The input value to check
 * @param format The expected format
 * @returns True if input is complete
 */
export const isDateInputComplete = (value: string, format: string): boolean => {
  if (format === "dd/MM/yyyy") {
    return value.length === 10;
  }
  return true;
};

/**
 * Formats date display for the trigger button
 * @param selectedRange Current selected date range
 * @param allowSingleDateSelection Whether single date selection is allowed
 * @returns Formatted display string
 */
export const formatDateDisplay = (
  selectedRange: DateRange,
  allowSingleDateSelection: boolean = false,
): string => {
  if (!selectedRange.startDate) {
    return "Select date range";
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const startDateStr = selectedRange.startDate.toLocaleDateString(
    "en-US",
    formatOptions,
  );
  const startTimeStr = selectedRange.startDate.toLocaleTimeString(
    "en-US",
    timeFormatOptions,
  );

  if (
    !selectedRange.endDate ||
    (allowSingleDateSelection &&
      selectedRange.startDate.getTime() === selectedRange.endDate.getTime())
  ) {
    return `${startDateStr}, ${startTimeStr}`;
  }

  const endDateStr = selectedRange.endDate.toLocaleDateString(
    "en-US",
    formatOptions,
  );
  const endTimeStr = selectedRange.endDate.toLocaleTimeString(
    "en-US",
    timeFormatOptions,
  );

  return `${startDateStr}, ${startTimeStr} - ${endDateStr}, ${endTimeStr}`;
};

/**
 * Handles date input change with formatting and validation
 * @param value Input value
 * @param dateFormat Date format string
 * @param currentRange Current selected range
 * @param timeValue Current time value (HH:mm)
 * @returns Object with formatted value, validation result, and updated range
 */
export const handleDateInputChange = (
  value: string,
  dateFormat: string,
  currentRange: DateRange,
  timeValue: string,
  isStartDate: boolean = true,
): {
  formattedValue: string;
  validation: DateValidationResult;
  updatedRange?: DateRange;
} => {
  const formattedValue = formatDateInput(value, dateFormat);
  const validation = validateDateInput(formattedValue, dateFormat);

  let updatedRange: DateRange | undefined;

  if (validation.isValid && isDateInputComplete(formattedValue, dateFormat)) {
    const parsedDate = parseDate(formattedValue, dateFormat);
    if (parsedDate !== null && isValidDate(parsedDate)) {
      const [hours, minutes] = timeValue.split(":").map(Number);
      parsedDate.setHours(hours, minutes);

      updatedRange = isStartDate
        ? { ...currentRange, startDate: parsedDate }
        : { ...currentRange, endDate: parsedDate };
    }
  }

  return {
    formattedValue,
    validation,
    updatedRange,
  };
};

/**
 * Handles time change for date range
 * @param time New time value (HH:mm)
 * @param currentRange Current selected range
 * @param isStartTime Whether this is start time or end time
 * @returns Updated date range
 */
export const handleTimeChange = (
  time: string,
  currentRange: DateRange,
  isStartTime: boolean = true,
): DateRange => {
  const targetDate = isStartTime
    ? currentRange.startDate
    : currentRange.endDate;

  if (targetDate) {
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(targetDate);
    newDate.setHours(hours, minutes);

    return isStartTime
      ? { ...currentRange, startDate: newDate }
      : { ...currentRange, endDate: newDate };
  }

  return currentRange;
};

/**
 * Handles date selection from calendar
 * @param range Selected date range from calendar
 * @param startTime Current start time
 * @param endTime Current end time
 * @param dateFormat Date format string
 * @returns Object with updated range and formatted date strings
 */
export const handleCalendarDateSelect = (
  range: DateRange,
  startTime: string,
  endTime: string,
  dateFormat: string,
): {
  updatedRange: DateRange;
  formattedStartDate: string;
  formattedEndDate: string;
} => {
  if (range.startDate) {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    range.startDate.setHours(startHour, startMinute);
  }

  if (range.endDate) {
    const [endHour, endMinute] = endTime.split(":").map(Number);
    range.endDate.setHours(endHour, endMinute);
  }

  return {
    updatedRange: range,
    formattedStartDate: formatDate(range.startDate, dateFormat),
    formattedEndDate: formatDate(range.endDate, dateFormat),
  };
};

/**
 * Handles preset selection
 * @param preset Selected preset
 * @param dateFormat Date format string
 * @returns Object with updated range, formatted dates, and times
 */
export const handlePresetSelection = (
  preset: DateRangePreset,
  dateFormat: string,
): {
  updatedRange: DateRange;
  formattedStartDate: string;
  formattedEndDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
} => {
  const range = getPresetDateRange(preset);

  return {
    updatedRange: range,
    formattedStartDate: formatDate(range.startDate, dateFormat),
    formattedEndDate: formatDate(range.endDate, dateFormat),
    formattedStartTime: formatDate(range.startDate, "HH:mm"),
    formattedEndTime: formatDate(range.endDate, "HH:mm"),
  };
};

/**
 * Handles cancel action - resets to original values
 * @param originalValue Original date range value
 * @param dateFormat Date format string
 * @returns Object with reset values
 */
export const handleCancelAction = (
  originalValue: DateRange | undefined,
  dateFormat: string,
): {
  resetRange: DateRange;
  formattedStartDate: string;
  formattedEndDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
} | null => {
  if (!originalValue) return null;

  return {
    resetRange: originalValue,
    formattedStartDate: formatDate(originalValue.startDate, dateFormat),
    formattedEndDate: formatDate(originalValue.endDate, dateFormat),
    formattedStartTime: formatDate(originalValue.startDate, "HH:mm"),
    formattedEndTime: formatDate(originalValue.endDate, "HH:mm"),
  };
};

/**
 * Handles loading more months in calendar
 * @param months Current months array
 * @param direction Direction to load ('past' or 'future')
 * @param isLoadingPast Current loading state for past
 * @param isLoadingFuture Current loading state for future
 * @returns Promise that resolves when loading is complete
 */
export const handleLoadMoreMonths = async (
  months: { month: number; year: number }[],
  direction: "past" | "future",
  isLoadingPast: boolean,
  isLoadingFuture: boolean,
): Promise<{ month: number; year: number }[] | null> => {
  if (
    (direction === "past" && isLoadingPast) ||
    (direction === "future" && isLoadingFuture)
  ) {
    return null;
  }

  const chunkParams = getNextChunkParams(months, direction);
  if (!chunkParams) {
    return null;
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const { startYear, startMonth } = chunkParams;
  let newChunk: { month: number; year: number }[];

  if (direction === "past") {
    const firstMonth = months[0];
    const endMonth = firstMonth.month === 0 ? 11 : firstMonth.month - 1;
    const adjustedEndYear =
      firstMonth.month === 0 ? firstMonth.year - 1 : firstMonth.year;

    newChunk = generateMonthChunk(
      startYear,
      startMonth,
      adjustedEndYear,
      endMonth,
    );
  } else {
    const endYear = startYear + 2;
    newChunk = generateMonthChunk(startYear, startMonth, endYear);
  }

  return newChunk;
};

/**
 * Handles scroll position updates for calendar
 * @param scrollTop Current scroll position
 * @param scrollHeight Total scroll height
 * @param clientHeight Client height
 * @param loadThreshold Threshold for triggering loads
 * @returns Object indicating what should be loaded
 */
export const handleCalendarScroll = (
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
  loadThreshold: number = 100,
): {
  shouldLoadPast: boolean;
  shouldLoadFuture: boolean;
} => {
  const shouldLoadPast = scrollTop < loadThreshold;
  const shouldLoadFuture =
    scrollTop + clientHeight > scrollHeight - loadThreshold;

  return {
    shouldLoadPast,
    shouldLoadFuture,
  };
};

/**
 * Creates calendar month data structure for rendering
 * @param year Year of the month
 * @param month Month (0-based)
 * @param monthIndex Index in the months array
 * @param monthHeight Height of each month
 * @returns Month data for rendering
 */
export const createCalendarMonthData = (
  year: number,
  month: number,
  monthIndex: number,
  monthHeight: number,
) => {
  const weeks = generateMonthWeeks(year, month);
  const topOffset = getMonthOffset(monthIndex, monthHeight);

  return {
    key: `month-${year}-${month}`,
    year,
    month,
    weeks,
    topOffset,
    monthHeight,
    monthName: getMonthName(month),
  };
};

/**
 * Calculates day cell props for rendering
 * @param date Date object
 * @param selectedRange Current selected range
 * @param today Today's date
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @param calendarToken Calendar token for styling
 * @returns Day cell props
 */
export const calculateDayCellProps = (
  date: Date,
  selectedRange: DateRange,
  today: Date,
  disableFutureDates: boolean,
  disablePastDates: boolean,
  calendarToken: CalendarTokenType,
): {
  dateStates: ReturnType<typeof getDateCellStates>;
  styles: Record<string, unknown>;
  textColor: string | unknown;
  showTodayIndicator: boolean;
} => {
  const dateStates = getDateCellStates(
    date,
    selectedRange,
    today,
    disableFutureDates,
    disablePastDates,
  );

  const getCellStyles = () => {
    let styles = { ...calendarToken.calendar.calendarGrid.day.cell };

    if (dateStates.isSingleDate) {
      styles = {
        ...styles,
        ...calendarToken.calendar.calendarGrid.day.states.singleDate,
      };
    } else if (dateStates.isStart) {
      styles = {
        ...styles,
        ...calendarToken.calendar.calendarGrid.day.states.startDate,
      };
    } else if (dateStates.isEnd) {
      styles = {
        ...styles,
        ...calendarToken.calendar.calendarGrid.day.states.endDate,
      };
    } else if (dateStates.isRangeDay) {
      styles = {
        ...styles,
        ...calendarToken.calendar.calendarGrid.day.states.rangeDay,
      };
    }

    if (dateStates.isDisabled) {
      styles = {
        ...styles,
        ...calendarToken.calendar.calendarGrid.day.states.disabledDay,
      };
    }

    return styles;
  };

  const getTextColor = () => {
    if (dateStates.isStart || dateStates.isEnd || dateStates.isSingleDate) {
      return calendarToken.calendar.calendarGrid.day.text.selectedDay.color;
    } else if (dateStates.isTodayDay) {
      return calendarToken.calendar.calendarGrid.day.text.todayDay.color;
    } else if (dateStates.isRangeDay) {
      return calendarToken.calendar.calendarGrid.day.text.rangeDay.color;
    }
    return calendarToken.calendar.calendarGrid.day.text.dayNumber.color;
  };

  return {
    dateStates,
    styles: getCellStyles(),
    textColor: getTextColor(),
    showTodayIndicator: shouldShowTodayIndicator(dateStates),
  };
};
