import { useEffect, useState } from 'react';

const format = (d) => d.toTimeString().slice(0, 8);

/** Returns the local time as HH:MM:SS, updated every second. */
export function useClock() {
  const [time, setTime] = useState(() => format(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
