import request from '@/utils/request'
import qs from 'qs'
import { LOTTERY_BASE_URL } from '@/constant'

/*
* 获取抽奖列表
* */
export function getLottery(params) {
    return request({
        url: `${LOTTERY_BASE_URL}/lottery`,
        method: 'get',
        params
    })
}

/*
* 添加抽奖
* */
export function createLottery(data) {
    return request({
        url: `${LOTTERY_BASE_URL}/lottery`,
        method: 'post',
        data
    })
}

/*
* 查看抽奖
* */
export function getLotteryById(id) {
    return request({
        url: `${LOTTERY_BASE_URL}/lottery/${id}`,
        method: 'get'
    })
}

/*
* 删除抽奖
* */
export function deleteLotteryById(id) {
    return request({
        url: `${LOTTERY_BASE_URL}/lottery/${id}`,
        method: 'delete'
    })
}
//更新抽奖的基本信息
export function updateLotteryById(id,data){
    return request({
        url: `${LOTTERY_BASE_URL}/lottery/${id}`,
        method: 'PUT',
        data
    })
}

//添加抽奖项
export function addLotteryItems(id,data){
    return request({
        url: `${LOTTERY_BASE_URL}/lottery/${id}/lotteryItems`,
        method: 'POST',
        data: qs.stringify(data),
    })
}

//添加未中奖设置
export function addLosingPrize(id,data){
    return request({
        url: `${LOTTERY_BASE_URL}/lottery/${id}/losingPrice`,
        method: 'POST',
        data: qs.stringify(data),
    })
}

//清空奖项
export function deleteLotteryItems(id){
    return request({
        url: `${LOTTERY_BASE_URL}/lottery/${id}/lotteryItems`,
        method: 'DELETE'
    })
}

//发布抽奖

export function publishLottery(id,data){
    return request({
        url:`${LOTTERY_BASE_URL}/lottery/${id}/publish`,
        method:'PUT',
        data: qs.stringify(data),
    })
}

export function copyLotteryById(id){
    return request({
        url:`${LOTTERY_BASE_URL}/lottery/${id}/copy`,
        method:'GET'
    })
}