import request from '@/utils/request'
import { GOOD_BASE_URL, USER_BASE_URL } from '../constant'

export function getStaff() {
    return request({
        url: '/staff/list',
        method: 'get'
    })
}


/**
 * 创建职位
 * @param {*} data 
 */
export function createStaff(data){
    return request({
        url:`${USER_BASE_URL}/user/public/api/roles`,
        method:'post',
        data
    })
}

export function updateStaff(data,id){
    return request({
        url:`${USER_BASE_URL}/user/public/api/roles/${id}`,
        method:'patch',
        data
    })
}

export function deleteStaff(id){
    return request({
        url:`${USER_BASE_URL}/user/public/api/roles/${id}`,
        method:'delete',
    })
}

export function createEmployee(data){
    return request({
        url:`${USER_BASE_URL}/user/public/api/staffs`,
        method:'post',
        data
    })
}

