import request from '@/utils/request'
import { GOOD_BASE_URL } from '../constant'

export function deleteAttach(id) {
  return request({
    url: `${GOOD_BASE_URL}/api/attach/${id}`,
    method: 'delete',
  })
}
/**
 * 
 * @param {module:String,file:File} data 
 */
export function addAttach(data){
  return request({
    url: `${GOOD_BASE_URL}/api/attach`,
    method: 'post',
    data,
  })
}