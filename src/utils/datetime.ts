import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Shanghai');
dayjs.locale('zh-cn');

const dateTimeFormat = "YYYY-MM-DD HH:mm:ss 'UTC'Z";

type DateTime = string | number | Date | Dayjs | null | undefined;

export function formatDateTime(datetime: DateTime): string {
  if (typeof datetime == 'object' && datetime instanceof Dayjs) {
    return datetime.format(dateTimeFormat);
  }
  return dayjs(datetime).format(dateTimeFormat);
}

export function getDiffToNow(datetime: Dayjs) {
  return dayjs.duration(dayjs().diff(datetime));
}
