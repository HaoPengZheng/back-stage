// import Vue from 'vue'
// 新增抽奖页面的store
const addLotteryState = {
    state: {
        activeStep:0,//当前步骤
        lottery:null,//抽奖信息
    },
    getters: {
       //可以到达的步骤
       getAddLotteryCouldGoStep(state){
           let lottery = state.lottery
           if(lottery){
                if(lottery.lotteryItems&&lottery.lotteryItems.length>0&&lottery.losingPrice){
                    return 2;
                }
                return 1;
           }
           return 0;
       }
    },
    mutations: {
      Reset_Add_Lottery:state =>{
          state.step = 0 
          state.lottery = null
      },
      Update_Lottery(state,lottery){
          state.lottery = lottery
      },
      Add_Lottery_Go_Last(state){
        state.activeStep = state.activeStep > 0 ? state.activeStep-1 : 0 
      },
      Add_Lottery_Go_Next(state){
          state.activeStep += 1;
      }

    },
    actions: {

    }
}

export default addLotteryState
