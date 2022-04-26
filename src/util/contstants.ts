import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Size constants
export const TALL = "400px";
export const SHORT = "326px";
export const HIGH = "-3rem";
export const LOW = "-5rem";

// Time constants
export const NOW = dayjs("2022-05-01");
export const MIDNIGHT = NOW.tz("America/Toronto").endOf("day");
