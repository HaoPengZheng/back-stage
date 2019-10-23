import request from '@/utils/request'
import { ZULL, USER_BASE_URL } from '../constant'

/**
 * 
 */
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
export function getMachineOnline(macList) {
    return request({
        url: `${ZULL}/faceMachine/api/v1/machines/online`,
        method: 'POST',
        data: {
            mac: macList
        }
    })
}