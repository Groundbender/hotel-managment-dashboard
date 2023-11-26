import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';

// ф-ия для дат и для строк
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Для Supabase требуется строка даты ISO. Однако эта строка будет отличаться при каждом рендеринге, поскольку MS или SEC изменились, что нехорошо. Поэтому мы используем этот трюк, чтобы удалить любое время
export const getToday = function (options = {}) {
  const today = new Date();

  // Это необходимо для сравнения с созданным_at из Supabase, потому что это не 0.0.0.0, поэтому нам нужно установить дату как КОНЕЦ дня, когда мы сравниваем ее с более ранними датами.
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
