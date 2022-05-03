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
const testDate = process.env.TEST_DATE ? dayjs(process.env.TEST_DATE) : null;
export const NOW = testDate || dayjs().tz("America/Toronto");
export const MIDNIGHT = NOW.endOf("day");
export const LAUNCH_DAY = dayjs("2022-01-01")
  .tz("America/Toronto")
  .endOf("day");
