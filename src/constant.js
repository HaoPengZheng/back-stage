const GOOD_BASE_URL ='http://192.168.101.115:8089'
const MAP_QQ_KEY = 'WRKBZ-TGBKS-3KOOJ-6MKHG-2EVN7-7JFG3'
const USER_BASE_URL = process.env === 'production' ? "39.108.77.108":'http://192.168.101.147'
// const ZULL = 'http://192.168.101.115:9001'
const ZULL = process.env === 'production' ? 'http://service.00800.com.cn/cloud/' :'http://192.168.101.115:9001'
export {GOOD_BASE_URL,MAP_QQ_KEY,USER_BASE_URL,ZULL}