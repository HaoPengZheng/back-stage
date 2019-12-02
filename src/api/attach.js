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
/*
* { module: 'all',page: 1, limit: 10, type: 'jpg.mp4' }
* type .隔开
* */
export function getAttach(params){
  return request({
    url: `${GOOD_BASE_URL}/api/attach`,
    method: 'get',
    params,
  })
}