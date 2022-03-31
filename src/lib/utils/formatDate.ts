import siteMetadata from 'data/siteMetadata'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import 'dayjs/locale/zh-cn'

dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Shanghai')
dayjs.locale('zh-cn')

type DateTime = string | number | Date | Dayjs | null | undefined

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options)

  return now
}

export function formatDateTime(datetime: DateTime): string {
  return dayjs(datetime).format()
}

export function getDiffToNow(datetime: Dayjs) {
  return dayjs.duration(dayjs().diff(datetime))
}

export default formatDate
