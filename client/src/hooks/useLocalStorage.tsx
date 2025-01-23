import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      // Return initialValue if no item found
      if (!item) {
        return initialValue;
      }

      try {
        const parsedItem = JSON.parse(item) as T;
        // Validate that parsedItem is either "light" or "dark" for theme
        if (
          key === "theme" &&
          parsedItem !== "light" &&
          parsedItem !== "dark"
        ) {
          return initialValue;
        }
        return parsedItem;
      } catch (parseError) {
        localStorage.removeItem(key);
        return initialValue;
      }
    } catch (error) {
      console.warn(`Error accessing localStorage for key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
