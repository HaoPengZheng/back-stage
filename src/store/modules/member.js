import { getGoods } from "@/api/good";
import Vue from 'vue'
//负责所有会员模块的数据处理
const goodState = {
    state:{
        isInit:false,
        goodList:[],
        
    },
    mutations:{
        Init_Good_List(state,goodList){
            state.goodList = goodList
        }
    },
    actions:{
        async getGoodList(context){
            if(!context.state.isInit){
                let companyId = Vue.ls.get('company')
                await getGoods(companyId, "all").then(res => {
                    context.commit('Init_Good_List',res.data.data)
                });
            }
            
        }
    }
}

export default goodState