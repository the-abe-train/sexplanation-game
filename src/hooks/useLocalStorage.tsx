import dayjs, { Dayjs } from "dayjs";

import { useState, useEffect } from "react";
import { NOW } from "../util/contstants";

interface IStorage extends Object {
  expiration?: Dayjs;
}

// TODO check if solved: guesses is not resetting on a new day

function getStorageValue<T>(key: string, defaultValue: T): T {
  const saved = localStorage.getItem(key);
  if (saved) {
    const value = JSON.parse(saved);
    if (value.expiration) {
      if (dayjs(value.expiration) < NOW) {
        return defaultValue;
      }
    }
    return JSON.parse(saved);
  } else {
    return defaultValue;
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
    if (key === "guesses") {
    }
    if (value.expiration) {
      if (dayjs(value.expiration) < NOW) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return;
      }
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, defaultValue]);

  return [value, setValue];
}
