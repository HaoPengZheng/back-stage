<script>
export default {
    props:{
        time:String
    },
    methods:{
        renderTimeTag(time){
            let nowDate = this.$moment(new Date())
            let nowYear = nowDate.year()
            let dayDiff = this.$moment(this.time).dayOfYear() - nowDate.dayOfYear()
            if(nowYear == this.$moment(this.time).year()&&dayDiff>=0){
                if(dayDiff<=1){
                    return (<a-tag class="tag" color="#ff5c5c">{dayDiff}天后下架</a-tag>)
                }else if(dayDiff<=7){
                      return (<a-tag class="tag" color="#fea32c">{dayDiff}天后下架</a-tag>)

                }else if(dayDiff<=31){
                      return (<a-tag class="tag" color="#f89c802">{dayDiff}天后下架</a-tag>)
                }
            }
            
        }
    },
    render(h){
        return (
            <div>
                {this.time?this.$moment(this.time).format('YYYY-MM-DD'):""}
                {this.renderTimeTag(this.$moment(this.time).format('YYYY-MM-DD'))}
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.tag {
  margin-left: 8px;
}
</style>