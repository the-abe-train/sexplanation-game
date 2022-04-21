import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

interface IStorage extends Object {
  day?: Dayjs;
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
    const expirationString = value?.day ? value.day : "2030-01-01";
    const expiration = dayjs(expirationString);
    // console.log("Stored data", value);
    // console.log("Expiration date", expiration);
    // console.log("Today", dayjs());
    // console.log("The difference", expiration.diff(dayjs(), "day"));
    if (dayjs().diff(expiration, "day") <= 1) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  }, [key, value, defaultValue]);

  return [value, setValue];
}
