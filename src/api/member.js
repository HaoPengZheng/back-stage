import request from '@/utils/request'
import { GOOD_BASE_URL, USER_BASE_URL } from '../constant'

export function createRoles(data){
    return request({
        url:`${USER_BASE_URL}/api/roles`,
        method:'Post',
        data
    })
}

export function getClientRoles(params){
    return request({
        url:`${USER_BASE_URL}/api/roles`,
        method:'get',
        params
    })
}