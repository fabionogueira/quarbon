/** @format */

const date = {
  validate(date: string | Date) {
    if (date && typeof date == 'string') {
      let [strYear, strMonth, strDay] = date.split('-')

      try {
        let day = Number(strDay)
        let month = Number(strMonth) - 1
        let year = Number(strYear)

        let dt = new Date(year, month, day)

        return day == dt.getDate() && month == dt.getMonth() && year == dt.getFullYear()
      } catch (error) {
        return false
      }
    }

    return false
  },

  /**
   * @param date string | Date
   * @param mask values: d,dd,ddd,dddd | m, mm, mmm, mmmm | yy, yyyy | h,hh | H,HH | M,MM | s, ss
   */
  format(date: string | Date, mask = 'default') {
    const type = typeof date

    if (!date) {
      return date
    }

    if (type == 'string' || type == 'number') {
      const sep = (date as string).includes('-') ? '-' : '/'
      const arr = (date as string).split(' ')[0].split(sep)

      date =
        sep == '-'
          ? new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]))
          : new Date(Number(arr[2]), Number(arr[1]) - 1, Number(arr[1]))
    }

    return dateFormat(date as Date, mask)
  },

  MASK_SHORT_DATE: 'shortDate',
  MASK_SHORT_TIME: 'shortTime',
  MASK_MEDIUM_DATE: 'mediumDate',
  MASK_MEDIUM_TIME: 'mediumTime',
  MASK_LONG_DATE: 'longDate',
  MASK_LONG_TIME: 'longTime',
  MASK_FULL_DATE: 'fullDate',
  MASK_ISO_DATE: 'isoDate',
  MASK_ISO_TIME: 'isoTime',
  MASK_ISO_DATE_TIME: 'isoDateTime',
  MASK_ISO_UTC: 'isoUtcDateTime',
}

const dateFormat = (function () {
  const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g
  const flags: { [key: string]: Function } = {
    d(date: Date) {
      return date.getDate()
    },
    dd(date: Date) {
      return ('0' + this.d(date)).slice(-2)
    },
    ddd(date: Date) {
      return i18n.dayNames[date.getDay()]
    },
    dddd(date: Date) {
      return i18n.dayNames[date.getDay() + 7]
    },
    m(date: Date) {
      return date.getMonth() + 1
    },
    mm(date: Date) {
      return ('0' + this.m(date)).slice(-2)
    },
    mmm(date: Date) {
      return i18n.monthNames[date.getMonth()]
    },
    mmmm(date: Date) {
      return i18n.monthNames[date.getMonth() + 12]
    },
    yy(date: Date) {
      return String(date.getFullYear()).slice(2)
    },
    yyyy(date: Date) {
      return date.getFullYear()
    },
    h(date: Date) {
      return date.getHours() % 12 || 12
    },
    hh(date: Date) {
      return ('0' + this.h(date)).slice(-2)
    },
    H(date: Date) {
      return date.getHours()
    },
    HH(date: Date) {
      return ('0' + this.H(date)).slice(-2)
    },
    M(date: Date) {
      return date.getMinutes()
    },
    MM(date: Date) {
      return ('0' + this.M(date)).slice(-2)
    },
    s(date: Date) {
      return date.getSeconds()
    },
    ss(date: Date) {
      return ('0' + this.s(date)).slice(-2)
    },
  }
  const i18n = {
    dayNames: [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    monthNames: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  }
  const masks: { [key: string]: string } = {
    default: 'ddd mmm dd yyyy HH:MM:ss',
    shortDate: 'm/d/yy',
    mediumDate: 'mmm d, yyyy',
    longDate: 'mmmm d, yyyy',
    fullDate: 'dddd, mmmm d, yyyy',
    shortTime: 'h:MM TT',
    mediumTime: 'h:MM:ss TT',
    longTime: 'h:MM:ss TT Z',
    isoDate: 'yyyy-mm-dd',
    isoTime: 'HH:MM:ss',
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
  }

  return function (date: Date, mask: string) {
    mask = masks[mask] || mask

    return mask.replace(token, function (flag: string) {
      return flags[flag] ? flags[flag](date) : flag
    })
  }
})()

export default date
