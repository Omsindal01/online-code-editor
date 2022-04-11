import { useState, useEffect } from "react";

const prefix = "op";
export default function useLocalStorage(key, init) {
  const newKey = prefix + key;
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(newKey);
    if (data != null) return JSON.parse(data);
    if (typeof init === "function") return init();
    else return init;
  });
  useEffect(() => {
    localStorage.setItem(newKey, JSON.stringify(value));
  }, [newKey, value]);
  return [value, setValue];
}
