<template>
  <div class="content-warp">
  </div>
</template>

<script>
import {getUserList} from '@/api/user'
export default {
    created(){
        this.init()
    },
    methods:{
        init(){
            this.initUserData()
        },
        initUserData(){
            let params = {
                include:'user',
                type:'client',
                start:0,
                limit:20
            }
            getUserList(params).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>