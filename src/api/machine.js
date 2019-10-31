import request from '@/utils/request'
import { ZULL, USER_BASE_URL } from '../constant'

export function addMachine(data) {
    return request({
        url: `${ZULL}/faceMachine/api/v1/machines`,
        method: 'POST',
        data
    })
}

export function getMachineList(params) {
    return request({
        url: `${ZULL}/faceMachine/api/v1/machines`,
        method: 'get',
        params
    })
}

export function deleteMachine(id) {
    return request({
        url: `${ZULL}/faceMachine/api/v1/machines/${id}`,
        method: 'Delete'
    })
}
export function getMachineOnline() {
    return request({
        url: `${ZULL}/faceMachine/api/v1/machines/online`,
        method: 'POST',
    })
}

export function appAddPerson(data){
    return request({
        url: `${ZULL}/faceMachine/api/v1/faces/appAddPerson`,
        method: 'POST',
        data
    })
}


// 添加时间段
export function addTimeQuantum(data){
    return request({
        url:`${ZULL}/faceMachine/api/v1/machines/sjd`,
        method:'POST',
        data
    })
}