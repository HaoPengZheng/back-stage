import request from '@/utils/request'
import { ZUUL, USER_BASE_URL } from '../constant'

export function addMachine(data) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/machines`,
        method: 'POST',
        data
    })
}

export function getMachineList(params) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/machines`,
        method: 'get',
        params
    })
}

export function deleteMachine(id) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/machines/${id}`,
        method: 'Delete'
    })
}
export function getMachineOnline() {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/machines/online`,
        method: 'POST',
    })
}

export function appAddPerson(data) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/faces/appAddPerson`,
        method: 'POST',
        data
    })
}


// 添加时间段
export function addTimeQuantum(data) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/machines/sjd`,
        method: 'POST',
        data
    })
}

export function deleteTimeQuantum(mac) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/machines/sjd/${mac}`,
        method: 'DELETE'
    })
}

export function machinesLogList(params) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/logs/list`,
        method: 'GET',
        params
    })
}

// export function getFace(wgCard,data){
//     return request({
//         url:`${ZUUL}/faceMachine/api/v1/faces/${wgCard}`,
//         method:'PUT',
//         data
//     })
// }

export function updateFace(wgCard, data) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/faces/${wgCard}`,
        method: 'PUT',
        data,
        headers: {
            'Content-Type': 'application/json;'
        }
    })
}

export function deleteFace(machineId, faceId) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/machines/${machineId}/faces/${faceId}`,
        method: 'Delete',
    })
}

export function deleteFaceByMac(data) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/faces/machines`,
        method: 'DELETE',
    })
}


export function inoutFaceList(params) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/logs/list?page=1&limit=11&sort=desc&platformId=440582199704036138&startTime=2019-01-01 00:00:00&endTime=2020-01-01 00:00:00`,
        method: 'GET',
        params
    })
}

// export function machinesLogList(){
//     return request({
//         url:`${ZUUL}/faceMachine/api/v1/logs/test`,
//         method:'GET',

//     })
// }
export function getFaceById(id) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/faces/${id}`,
        method: 'GET'
    })
}

//根据faceid发放人脸到机子
export function pushFashToMachine(id, data) {
    return request({
        url: `${ZUUL}/faceMachine/api/v1/faces/${id}/machines`,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;'
        }
    })
}