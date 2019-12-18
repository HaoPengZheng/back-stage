import { getGoods } from "@/api/good";
import { getInstitutions } from "@/api/institutions";
import Vue from 'vue'
//负责所有会员模块的数据处理
const memberState = {
    state:{
        isInit:false,
        goodList:[],
        memberList:[],
        institutions:[]
    },
    mutations:{
        Init_Good_List(state,goodList){
            state.goodList = goodList
        },
        Init_Member_List(state,memberList){
            state.memberList = memberList
        },
        Init_Institutions_List(state,institutions){
            state.institutions = institutions
        }
    },
    actions:{  
        async getInstitutionsList(context){
            if(!context.state.isInit){
                await getInstitutions().then(res=>{
                    context.commit('Init_Institutions_List',res.data.data)
                })
            }
        },
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