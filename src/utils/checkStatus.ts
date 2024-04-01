import moment from 'moment'

const checkStatusByDate = (startDateReq: Date, dueDateReq?: Date) => {
  const startDate = moment(startDateReq)
  const dueDate = dueDateReq ? moment(dueDateReq) : null
  const currentDate = moment()
  if (dueDate && dueDate.isBefore(currentDate)) {
    return 'late'
  } else if (startDate.isAfter(currentDate)) {
    return 'init'
  } else {
    return 'active'
  }
}
export { checkStatusByDate }
