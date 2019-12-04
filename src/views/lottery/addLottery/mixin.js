import { mapState } from 'vuex'
import { mapGetters} from 'vuex'

const mixinAddLotteryState = {
  computed: {
    ...mapState({
      activeStep: state => state.addLottery.activeStep,//只用来确认是否可以向前
      couldStep: state=>state.addLottery.couldStep,
      lottery: state => state.addLottery.lottery,//抽奖信息
    }),
    ...mapGetters({
      getAddLotteryCouldGoStep:'getAddLotteryCouldGoStep'
    })
  },
}

export { mixinAddLotteryState }
