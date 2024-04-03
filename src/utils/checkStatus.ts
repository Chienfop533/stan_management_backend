import moment from 'moment'
import { Response } from 'express'

const checkStatusByDate = (startDateReq: Date, dueDateReq?: Date) => {
  const startDate = moment(startDateReq).startOf('day')
  const dueDate = dueDateReq ? moment(dueDateReq).startOf('day') : null
  const currentDate = moment().startOf('day')
  if (dueDate && dueDate.isBefore(currentDate)) {
    return 'late'
  } else if (startDate.isAfter(currentDate)) {
    return 'init'
  } else {
    return 'active'
  }
}
const attachStatusCheckCookies = ({ res, isCheckedDate }: { res: Response; isCheckedDate: boolean }) => {
  res.cookie('is_checked_date', isCheckedDate, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 1000 * 60 * 60 * 24 * 60
  })
}
export { checkStatusByDate, attachStatusCheckCookies }
