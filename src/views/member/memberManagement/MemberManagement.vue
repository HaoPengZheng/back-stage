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
                include:'credit.records,authorization.contact',
                page:1,
                per_page:20
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