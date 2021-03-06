import request from '@/utils/request'
import { GOOD_BASE_URL,USER_BASE_URL } from '../constant'

export function addUser(data) {
  return request({
    url: `${USER_BASE_URL}/api/clients`,
    method: 'post',
    data
  })
}

export function getUserList(params){
  return request({
    url: `${USER_BASE_URL}/api/clients`,
    method:'get',
    params
  })
}