/**
 * Client-side helpers for "time until Sunday's service", always in Brno time.
 */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function pragueNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23', timeZone: 'Europe/Prague',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0';
  return { day: DAYS.indexOf(get('weekday')), hour: Number(get('hour')), minute: Number(get('minute')), second: Number(get('second')) };
}

/**
 * Minutes until the next service. Returns a negative number while the
 * service is happening (it lasts `lengthMin` minutes).
 */
export function minutesToService(time = '17:00', weekday = 6, lengthMin = 90) {
  const [h, m] = time.split(':').map(Number);
  const now = pragueNow();
  const nowMin = now.day * 1440 + now.hour * 60 + now.minute;
  let diff = weekday * 1440 + h * 60 + m - nowMin;
  if (diff < -lengthMin) diff += 7 * 1440;
  return diff;
}

export function splitMinutes(total: number) {
  return { days: Math.floor(total / 1440), hours: Math.floor((total % 1440) / 60), minutes: total % 60 };
}

export function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

export function untilSentence(total: number) {
  if (total <= 0) return null;
  const { days, hours, minutes } = splitMinutes(total);
  const parts = [days && plural(days, 'day'), hours && plural(hours, 'hour'), !days && minutes && plural(minutes, 'minute')].filter(Boolean) as string[];
  if (parts.length === 0) return 'less than a minute';
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)}` : parts[0];
}
