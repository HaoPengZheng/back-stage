<script>
export default {
    data(){
        return {

        }
    },
    props:{
        time:String
    },
    methods:{
        renderTimeTag(time){
            let nowDate = this.$moment(new Date())
            let nowYear = nowDate.year()
            let nowMonth = nowDate.month()
            let nowTimeDate = nowDate.date()
            if(this.$moment(this.time).year() - nowYear == 1){
                return (<a-tag class="tag" color="#f50">最近一年下架</a-tag>)
            }
        }
    },
    render(h){
        return (
            <div>
                {this.$moment(this.time).format('YYYY-MM-DD')}
                {this.renderTimeTag(this.$moment(this.time).format('YYYY-MM-DD'))}
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.tag{
    margin-left: 8px;
}
</style>