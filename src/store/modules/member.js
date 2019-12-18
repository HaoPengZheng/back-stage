import { getGoods } from "@/api/good";
import { getClientRoles } from "@/api/member";
import Vue from 'vue'
//负责所有会员模块的数据处理
const memberState = {
    state:{
        isInit:false,
        goodList:[],
        memberList:[]
    },
    mutations:{
        Init_Good_List(state,goodList){
            state.goodList = goodList
        },
        Init_Member_List(state,memberList){
            state.memberList = memberList
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
            
        },
        async getMemberList(context){
            if(!context.state.isInit){
                await getClientRoles().then(res => {
                    context.commit('Init_Member_List',res.data.data)
                    console.log(res.data.data)
                });
            }
        }
    }
}

export default memberState