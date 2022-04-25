import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { useState, useEffect } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

interface IStorage extends Object {
  expiration?: Dayjs;
}

// TODO check if solved: guesses is not resetting on a new day

function getStorageValue<T>(key: string, defaultValue?: T): T {
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  } else if (defaultValue) {
    return defaultValue;
  } else {
    throw new Error("Local storage error");
  }
}

export function useLocalStorage<T extends IStorage>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  let [value, setValue] = useState(() => {
    return getStorageValue<T>(key, defaultValue);
  });

  useEffect(() => {
    // console.log("Stored data", value);
    // console.log("Expiration date", value.expiration);
    // console.log("Today", dayjs().toString());
    // console.log("The difference", dayjs().diff(dayjs(value.expiration)));
    if (value.expiration) {
      if (dayjs(value.expiration) < dayjs()) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return;
      }
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, defaultValue]);

  return [value, setValue];
}
