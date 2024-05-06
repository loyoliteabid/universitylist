/* eslint-disable @typescript-eslint/no-explicit-any */
// Type for stored data (can be any type)
type StoredData = any;

const storeData = (key: string, data: StoredData): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getData = (key: string): StoredData | null => {
  const storedDataString = localStorage.getItem(key);
  if (storedDataString) {
    return JSON.parse(storedDataString);
  } else {
    return null;
  }
};

export { storeData, getData };
