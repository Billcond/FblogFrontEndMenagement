<template>
<a-layout-content>
    <content-management-header/>
    <!--说明父组件先将数据传递给了子组件，即使在create中已经请求了  但它是异步的  导致了传递不正确
    但是赋值的时候已经更改了数据  会触发响应式，这里并没有更新-->
    <content-management-content :articles = "allArticles">
    </content-management-content>
    <router-view></router-view>
</a-layout-content>
</template>


<script>
import ContentManagementContent from './ContentManagementComponents/ContentManagementContent.vue';
import ContentManagementHeader from './ContentManagementComponents/ContentManagementHeader.vue';
export default {
  components:{ContentManagementContent, ContentManagementHeader},
  data () {
    return {
        //刚刚一直不成功，但是后来为啥成功了
        allArticles: "",
    }
  },
   beforeCreate(){
       console.log("===========ContentManagement=================")
       console.log("============================")
       console.log("============================")
    console.log('ContentManagement,beforeCreate',this.data,this.$el)
   
  },
  created(){//实例化好了 此时已经可以读取到原来的data中的数据了
  //这里可以请求axios  来观察数据的变化  请求到数据还要传到子组件中
    this.getRequest('/articles').then(resp=>{
          if(resp){
            console.log("ContentManagement,created 有响应------------------",resp.data)
            this.allArticles = resp.data;
            console.log(this.allArticles)
          }else{
            console.log('无响应')
            return false;
          }
        })
    console.log('ContentManagement,created',this.data,this.$el)
  },
  beforeMount(){
      console.log("ContentManagement,beforeMount()",this.data,this.$el)
  },
  mounted(){
      console.log("ContentManagement,mounted",this.data,this.$el)
  },
  beforeUpdate(){
       
      console.log("ContentManagement,beforeUpdate",this.data,this.$el)
  },
  updated(){
      console.log("ContentManagement,update",this.data,this.$el);
  },
  beforeDestroy(){
      console.log("ContentManagement,beforeDestory",this.data,this.$el);
  },
  destroyed(){
      console.log("ContentManagement,destoryed",this.data,this.$el);
  }
};

</script>


<style>
</style>
