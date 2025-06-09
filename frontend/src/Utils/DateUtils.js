// utils/dateUtils.js
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * Converts a local date to UTC ISO string for storage (e.g., Redux or API)
 */
export const formatDateToStore = (date) => {
  return dayjs(date).startOf('day').utc().toISOString();
};

/**
 * Converts a UTC date string to local Dayjs object for display
 */
export const formatDateForDisplay = (utcDateString) => {
  return dayjs.utc(utcDateString).local();
};
