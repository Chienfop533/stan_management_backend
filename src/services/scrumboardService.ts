import ScrumboardModel from '@/models/ScrumboardModel'
import { ScrumboardTypeReq } from '@/types/scrumboardType'

const createNewScrumboard = async (scrumboard: ScrumboardTypeReq) => {
  const newScrumboard = await ScrumboardModel.create({ ...scrumboard, listOrderIds: [], list: [], status: 'init' })
  return newScrumboard
}
export default { createNewScrumboard }
