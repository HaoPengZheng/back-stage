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
        url:`${USER_BASE_URL}/api/roles`,
        method:'post',
        data
    })
}

export function updateStaff(data,id){
    return request({
        url:`${USER_BASE_URL}/api/roles/${id}`,
        method:'patch',
        data
    })
}

export function deleteStaff(id){
    return request({
        url:`${USER_BASE_URL}/api/roles/${id}`,
        method:'delete',
    })
}

export function createEmployee(data){
    return request({
        url:`${USER_BASE_URL}/api/staffs`,
        method:'post',
        data
    })
}


// 获取员工信息
export function getEmployee(userId){
    return request({
        url:`${USER_BASE_URL}/api/staffs/${userId}?include=authorization,staffInformation`,
        method:'GET'
    })
}

//更新员工信息
export function updateEmployee(updateEmployee,userId){
    return request({
        url:`${USER_BASE_URL}/api/staffs/${userId}`,
        method:'patch',
        data:updateEmployee
    })
}

//删除员工
export function deleteEmployee(userId){
    return request({
        url:`${USER_BASE_URL}/api/staffs/${userId}`,
        method:'delete'
    })
}