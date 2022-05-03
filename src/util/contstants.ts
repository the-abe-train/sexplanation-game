import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Size constants
// export const TALL = "312px";
export const TALL = "417px";
export const SHORT = "312px";
// export const HIGH = "-5rem";
export const HIGH = "-3rem";
export const LOW = "-5rem";

// Time constants
export const NOW = dayjs().tz("America/Toronto");
export const MIDNIGHT = NOW.endOf("day");
export const LAUNCH_DAY = dayjs("2022-05-11")
  .tz("America/Toronto")
  .endOf("day");

export const SHUFFLE_KEY = process.env.REACT_APP_SHUFFLE_KEY || "1337";
